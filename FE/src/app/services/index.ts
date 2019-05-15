import { PostSentenceService } from "./post-sentence.service";
import { GetWordsService } from "./get-words.service";
import { UsersService } from "./user.service";
import { Interceptor } from "./interceptor.service";

export * from "./post-sentence.service";
export * from "./get-words.service";
export * from "./user.service";
export * from "./interceptor.service";

export const SERVICES = [
  PostSentenceService,
  GetWordsService,
  UsersService,
  Interceptor
];
