import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, map, Observable } from 'rxjs';
import { IItem } from '../shared/models/item.interface';
import { ITEMS_URL } from '../shared/utils/endpoints';
import { placeholderUrlFixer } from '../shared/utils/placeholder-url-fix';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items$: Observable<IItem[]> = EMPTY;
  displayedColumns: string[] = ['id', 'name', 'sku', 'brandName', 'image'];

  constructor(private _http: HttpClient, private _router: Router, private _accRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.items$ = this._getData();
  }

  navToItem(row: any) {
    const itemUrl = `${row.id}`;
    console.log({ row, itemUrl });
    this._router.navigate(['home', itemUrl]);
  }

  private _getData = (_page = 1, _limit = 5) => this._http.get<IItem[]>(`${ITEMS_URL}?_page=${_page}&_limit=${_limit}`).pipe(
    map(items => items.map(({ image, ...rest }) => ({ ...placeholderUrlFixer({ image }), ...rest }))),
    map(items => items as IItem[])
  );

}

