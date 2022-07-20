import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { IItem } from '../shared/models/item.interface';
import { ITEMS_URL } from '../shared/utils/endpoints';
import { placeholderUrlFixer } from '../shared/utils/placeholder-url-fix';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  destroy$$ = new Subject<void>();
  dataSource = new MatTableDataSource<IItem>();

  displayedColumns: string[] = ['id', 'name', 'sku', 'brandName', 'image'];

  constructor(private _http: HttpClient, private _router: Router, private _accRoute: ActivatedRoute) { }

  ngOnInit() {
    this._getAll().pipe(takeUntil(this.destroy$$)).subscribe(items => this.dataSource.data = items);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.destroy$$.next();
    this.destroy$$.complete();
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

  private _getAll = () => this._getData(1, 200);

}

