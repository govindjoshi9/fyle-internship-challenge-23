import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserInfoComponent } from './user-info/user-info.component';
import { RepoSectionComponent } from './repo-section/repo-section.component';
import { ButtonLoaderComponent } from './button/button-loader.component';
@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    RepoSectionComponent,
    ButtonLoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }