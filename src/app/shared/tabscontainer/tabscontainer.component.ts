import { Component, AfterContentInit,ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabscontainer',
  templateUrl: './tabscontainer.component.html',
  styleUrls: ['./tabscontainer.component.css']
})
export class TabscontainerComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs : QueryList<TabComponent> = new QueryList;
  

  constructor() { }

  ngAfterContentInit(): void {
    //console.log(this.tabs);

    const activeTabs = this.tabs?.filter( tabs => tabs.active);

    if(!activeTabs || activeTabs.length === 0){
      this.selectTab(this.tabs.first)

    }

  }

  selectTab(tab: TabComponent) {
    this.tabs?.forEach(tab => {
      tab.active = false;
    })
    tab.active = true;

    // to prevent the default behaviour for url redirection
    return false;


    
  }

  }


