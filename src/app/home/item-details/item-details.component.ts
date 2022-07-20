import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, Observable, EMPTY, tap } from 'rxjs';
import { IItem } from 'src/app/shared/models/item.interface';
import { ITEMS_URL } from 'src/app/shared/utils/endpoints';
import { placeholderUrlFixer } from 'src/app/shared/utils/placeholder-url-fix';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item$: Observable<IItem> = EMPTY;

  constructor(private _http: HttpClient, private _accRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log('Init ItemsDetailsComponent');
    this.item$ = this._accRoute.params.pipe(
      map(params => params['id']),
      switchMap(id => this._http.get<IItem>(`${ITEMS_URL}/${id}`)),
      map(({ preview, ...rest }: IItem) => ({ ...placeholderUrlFixer({ preview }), ...rest })),
      tap(console.log),
      map(item => item as IItem)
    );
  }

}
