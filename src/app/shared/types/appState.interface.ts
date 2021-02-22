import {AuthStateInterface} from '../../auth/types/authState.interface';
import {FeedStateInterface} from '../modules/feed/types/feedState.interface';
import {PopularTagsStateInterface} from '../modules/popular-tags/types/popularTagsState.interface';
import {ArticleStateInterface} from '../../article/types/articleState.interface';
import {CreateArticleStateInterface} from '../../create-article/types/createArticleState.interface';
import {EditArticleStateInterface} from '../../edit-article/types/editArticleState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
  createArticle: CreateArticleStateInterface;
  editArticle: EditArticleStateInterface;
}
