import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform  {

    transform(content: string, searchText: string) : string
    {
      content =  content.toLowerCase().replace(searchText.toLowerCase(), '');
       
       return "<b>"+searchText+"</b>"+content;

    }
}