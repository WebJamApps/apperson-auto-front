import {PageObjectWelcome} from './welcome.po';
import {PageObjectSkeleton} from './skeleton.po';

describe('aurelia skeleton app', () => {
  let poWelcome,
    poSkeleton;

  beforeEach(() => {
    poSkeleton = new PageObjectSkeleton();
    poWelcome = new PageObjectWelcome();

    browser.loadAndWaitForAureliaPage('http://localhost:19876');
  });

  it('should load the page and display the initial page title', () => {
    expect(poSkeleton.getCurrentPageTitle()).toBe('Welcome | Aurelia');
  });

  it('should display greeting', () => {
    expect(poWelcome.getGreeting()).toBe('Welcome to the Aurelia Navigation App!');
  });

  it('should automatically write down the fullname', () => {
    poWelcome.setFirstname('Rob');
    poWelcome.setLastname('Eisenberg');

    // For now there is a timing issue with the binding.
    // Until resolved we will use a short sleep to overcome the issue.
    browser.sleep(200);
    expect(poWelcome.getFullname()).toBe('ROB EISENBERG');
  });

  it('should show alert message when clicking submit button', () => {
    expect(poWelcome.openAlertDialog()).toBe(true);
  });

  it('should navigate to users page', () => {
    poSkeleton.navigateTo('#/users');
    expect(poSkeleton.getCurrentPageTitle()).toBe('Github Users | Aurelia');
  });
});
