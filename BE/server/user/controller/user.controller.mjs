import usersModel from '../../_model/users.model.mjs';
import wordsModel from '../../_model/words.model.mjs';
import utils from '../../utils/utils';

let giveFrequencyData = async function(req, res) {
  const user = req.header('user_id');
  if (!user) {
    return res.status(403).json({
      msg: 'User id not found in header!'
    });
  }
  try {
    const userData = await usersModel.findById(user);
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
    return res
      .status(200)
      .json({ user_data: userData, word_data: usersWordsMap });
  } catch (e) {
    console.log(e);
  }
};

let addUser = async function(req, res) {
  const user = new usersModel();
  const save = await user.save();
  return res.status(201).json({
    _id: save._id
  });
};

export default {
  giveFrequencyData,
  addUser
};
