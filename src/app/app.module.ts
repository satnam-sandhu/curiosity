import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { CutPipe } from './pipes/cut/cut.pipe';
import { PlaygroundComponent } from './playground/playground.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TextComponent } from './windows/text/text.component';
import { TableComponent } from './windows/table/table.component';
import { WorkbookComponent } from './windows/workbook/workbook.component';
import { SlicePipe } from './pipes/slice/slice.pipe';
import { DatePipe } from './pipes/date/date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    CutPipe,
    PlaygroundComponent,
    TextComponent,
    TableComponent,
    WorkbookComponent,
    SlicePipe,
    DatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
