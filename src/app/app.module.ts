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
import { TextComponent } from './windows/text/text.component';

@NgModule({
  declarations: [AppComponent, TreeComponent, CutPipe, PlaygroundComponent, TextComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
