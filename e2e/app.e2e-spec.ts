import { DemoEmployeePaySlipPage } from './app.po';

describe('demo-employee-pay-slip App', () => {
  let page: DemoEmployeePaySlipPage;

  beforeEach(() => {
    page = new DemoEmployeePaySlipPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
