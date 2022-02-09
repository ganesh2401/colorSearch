import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {filter, from, take} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-color-pallet',
  templateUrl: './color-pallet.component.html',
  styleUrls: ['./color-pallet.component.css']
})
export class ColorPalletComponent {

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef,) {
  }

  name: any;

  ChangeFunction(val: any) {


    if (val) {
      this.http.get('https://unpkg.com/color-name-list@8.38.0/dist/colornames.json').subscribe(x =>
          this.ShowData(x, val)
      );
    } else {
      this.masonryItems.splice(0, this.masonryItems.length);
      this.masonryItems = [
        {name: 'no color', hex: '0000'},
      ];
      this.cdr.detectChanges();
    }


  }

  masonryItems = [
    {name: 'no color', hex: '0000'},
  ];

  ShowData(x: any, val: any) {

    console.log(x);
    this.masonryItems.splice(0, this.masonryItems.length);

    // @ts-ignore
    from(x).pipe(filter(x => x.name.toLowerCase().startsWith(val.toLowerCase())), take(20)).subscribe(x => this.Update_Data(x));


  }

  Update_Data(x: any) {

    this.masonryItems.push(x);
    this.cdr.detectChanges();
  }
}
