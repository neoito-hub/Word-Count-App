import wordsModel from '../../_model/words.model.mjs';
import usersModel from '../../_model/users.model.mjs';

import utils from '../../utils/utils.mjs';

let addFrequencyData = async function(req, res) {
  try {
    const user = req.header('user_id');
    if (!user) {
      return res.status(403).json({
        msg: 'User id not found in header!'
      });
    }

    let str = req.body.string;
    if (!str || str === '' || typeof str !== 'string') {
      return res.status(400).json({
        msg: 'String is empty or not found!'
      });
    }

    str = str.trim().toLowerCase();
    const currentStringFreq = utils.wordFreq(str);
    const currentStringWords = Object.keys(currentStringFreq);

    const existingData = await wordsModel.find({
      user: user,
      word: {
        $in: currentStringWords
      }
    });
    const existingMap = utils.makeMap(existingData);

    const existingWords = existingData.map(e => e.word);
    const newWords = currentStringWords.filter(w => !existingWords.includes(w));

    // do inserts on new
    const newDocs = newWords.map(nw => {
      return {
        user: user,
        word: nw,
        frequency: currentStringFreq[nw]
      };
    });
    const insertStatus = await wordsModel.insertMany(newDocs);

    // do updates on existing
    const updateStatement = {};
    // { word: 'is', $set: {frequency: old + 12}}
    existingWords.forEach(async w => {
      await wordsModel.update(
        {
          user: user,
          word: w
        },
        { $set: { frequency: existingMap[w] + currentStringFreq[w] } }
      );
    });

    const fetch = await wordsModel.find(
      {
        user: user,
        word: {
          $in: currentStringWords
        }
      },
      {},
      {
        sort: {
          word: 1
        }
      }
    );

    const fetchMap = utils.makeMap(fetch);

    const userUpdate = await usersModel.update(
      {
        _id: user
      },
      {
        $set: {
          text: str,
          result: fetchMap
        }
      }
    );

    const usersWords = await wordsModel.find(
      { user: user },
      { user: 0, _id: 0 },
      {
        sort: {
          word: 1
        }
      }
    );
    const usersWordsMap = utils.makeMap(usersWords);

    return res.status(201).json(usersWordsMap);
  } catch (e) {
    console.log(e);
    return res.status(500).json({});
  }
};

export default {
  addFrequencyData
};
