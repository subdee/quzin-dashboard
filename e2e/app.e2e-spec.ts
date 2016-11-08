import { QuzinDashboardPage } from './app.po';

describe('quzin-dashboard App', function() {
  let page: QuzinDashboardPage;

  beforeEach(() => {
    page = new QuzinDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
