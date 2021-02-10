import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PopularTagType} from '../../../types/popularTag.type';
import {environment} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';
import {GetPopularTagsResponseInterface} from '../types/getPopularTagsResponse.interface';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    return this.http
      .get<GetPopularTagsResponseInterface>(`${environment.apiUrl}/tags`)
      .pipe(
        map((response: GetPopularTagsResponseInterface) => {
          return response.tags;
        })
      );
  }
}
