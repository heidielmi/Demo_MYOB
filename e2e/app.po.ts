import { browser, by, element } from 'protractor';

export class DemoEmployeePaySlipPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
