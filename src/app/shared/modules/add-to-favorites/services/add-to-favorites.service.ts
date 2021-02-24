import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {GetArticleResponseInterface} from '../../../types/getArticleResponse.interface';
import {ArticleInterface} from '../../../types/article.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

  getArticle(response: GetArticleResponseInterface): ArticleInterface {
    return response.article;
  }

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    // @ts-ignore
    return this.http.post(url, {}).pipe(map(this.getArticle));
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug);
    // @ts-ignore
    return this.http.delete(url).pipe(map(this.getArticle));
  }
}
