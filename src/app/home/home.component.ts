import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

const ITEMS_URL = 'http://localhost:8080/items';

export interface IItem {
  id: string,
  wbRating: number,
  reviewsCount: number,
  nomenclature: number,
  sku: string,
  name: string,
  brandName: string,
  brandId: string,
  image: string,
  preview: string,
  ordered: number,
  soldQuantity: number,
  soldAmount: number,
  orderedAmount: number,
  availability: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items$: Observable<IItem[]> = EMPTY;
  displayedColumns: string[] = ['id', 'name', 'sku', 'brandName'];

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.items$ = this._getData();
  }

  private _getData = (_page = 1, _limit = 5) => this._http.get<IItem[]>(`${ITEMS_URL}?_page=${_page}&limit=${_limit}`);

}
