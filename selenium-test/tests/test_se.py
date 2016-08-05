from .base_test import *
import time

@on_platforms(browsers)
class SeTest(BaseTest):

    def assertTextByTag(self, tag, text):
        max_attempts = 30
        while (max_attempts > 0):
            try:
                name = self.driver.find_element_by_tag_name(tag)
                assert text in name.text
                return True
            except:
                time.sleep(1)
                max_attempts -= 1
        raise AssertionError

    def assertTextById(self, html_id, text):
        max_attempts = 30
        while (max_attempts > 0):
            try:
                name = self.driver.find_element_by_id(html_id)
                assert text in name.text
                return True
            except:
                time.sleep(1)
                max_attempts -= 1
        raise AssertionError

    def clickButtonById(self, html_id):
        max_attempts = 30
        while (max_attempts > 0):
            try:
                self.driver.find_element_by_id(html_id).click()
                return True
            except:
                time.sleep(1)
                max_attempts -= 1
        raise AssertionError

    def clickButtonByCssSelector(self, css_selector, index):
        max_attempts = 30
        while (max_attempts > 0):
            try:
                self.driver.find_elements_by_css_selector(css_selector)[index].click() 
                return True
            except:
                time.sleep(1)
                max_attempts -= 1
        raise AssertionError

    @classmethod
    def setup_class(cls):
        BaseTest.setup_class()
        global profileUrl
        global forgotUrl
        profileUrl = "http://localhost:9000/#/profile"
        forgotUrl = "http://localhost:9000/#/forgot"

    # TEST - CHANGE PASSWORD
    def test_changePassword(self):
        self.driver.get(profileUrl)
        self.clickButtonById('change-btn')
        self.assertTextByTag('h2', 'Change password')
        element = self.driver.find_element_by_id("password")
        element.send_keys("askldjfiaweurxvk234")
        element = self.driver.find_element_by_id("pwagain")
        element.send_keys("askldjfiaweurxvk234")
        self.clickButtonById('change-btn')
        self.assertTextById('successful-header', 'Update successful')
        self.clickButtonById('ok-btn')
        self.assertTextById('name-header', 'Lorem Ipsum')
        self.clickButtonById('change-btn')
        self.clickButtonById('cancel-btn')
        self.assertTextById('name-header', 'Lorem Ipsum')

    # TEST - RESET PASSWORD (USE ALTERNATE METHODS)
    def test_resetPassword1(self): 
        self.driver.get(forgotUrl)
        self.assertTextById('forgot-description', 'ACME Inc')
        self.assertTextById('hint-label', 'Acme username, ex: first_last')
        element = self.driver.find_element_by_id("username")
        element.send_keys("username1")
        self.clickButtonById('continue-btn')
        self.assertTextById('reset-header', 'Password reset email sent')
        self.clickButtonById('methods-btn')
        self.assertTextByTag('h2', 'Alternate verification')
        self.clickButtonByCssSelector('button.md-icon-button', 0)
        self.clickButtonById('close-dialog')
        self.clickButtonByCssSelector('button.md-icon-button', 0)
        self.assertTextById('verification-header', 'Verification code sent')
        element = self.driver.find_element_by_name("verificationCode")
        element.send_keys("123")
        self.clickButtonById('verify-btn')
        self.assertTextByTag('h2', 'Change password')

    # TEST - RESET PASSWORD (RESEND)
    def test_resetPassword2(self): 
        self.driver.get(forgotUrl)
        self.assertTextById('forgot-description', 'ACME Inc')
        element = self.driver.find_element_by_id("username")
        element.send_keys("username1")
        self.clickButtonById('continue-btn')
        self.assertTextById('reset-header', 'Password reset email sent')
        self.clickButtonById('resend-btn')
        self.assertTextById('reset-header', 'Password reset email sent') 

    # TEST - RESET PASSWORD 
    def test_resetPassword3(self): 
        self.driver.get(forgotUrl)
        self.assertTextById('forgot-description', 'ACME Inc')
        element = self.driver.find_element_by_id("username")
        element.send_keys("username1")
        self.clickButtonById('continue-btn')
        self.assertTextById('reset-header', 'Password reset email sent')
        self.clickButtonById('done-btn')
        self.assertTextById('name-header', 'Lorem Ipsum')

    # TEST - ADD RECOVERY METHOD (EMAIL)
    def test_addEmailRecoveryMethod(self):
        self.driver.get(profileUrl)
        self.clickButtonById('add-btn')
        self.assertTextByTag('h2', 'Add recovery method')
        element = self.driver.find_element_by_id("email")
        element.send_keys("a@b.com")
        self.clickButtonById('add-btn')
        self.assertTextByTag('h2', 'Verify code')
        self.clickButtonById('resend-btn')
        self.assertTextByTag('h2', 'Verify code')
        element = self.driver.find_element_by_name("verificationCode")
        element.send_keys("123")
        self.clickButtonById('verify-btn')
        self.assertTextById('successful-header', 'Update successful')
        self.clickButtonById('ok-btn')
        self.assertTextById('name-header', 'Lorem Ipsum')
        self.clickButtonById('add-btn')
        self.clickButtonById('cancel-btn')
        self.assertTextById('name-header', 'Lorem Ipsum')

    # TEST - ADD RECOVERY METHOD (PHONE)
    def test_addPhoneRecoveryMethod(self):
        self.driver.get(profileUrl)
        self.clickButtonById('add-btn')
        self.assertTextByTag('h2', 'Add recovery method')
        self.driver.find_elements_by_tag_name('md-radio-button')[1].click()
        element = self.driver.find_element_by_id("phone")
        element.send_keys("7777777")
        self.clickButtonById('add-btn')
        self.assertTextByTag('h2', 'Verify code')
        element = self.driver.find_element_by_name("verificationCode")
        element.send_keys("123")
        self.clickButtonById('verify-btn')
        self.assertTextById('successful-header', 'Update successful')
        self.clickButtonById('ok-btn')
        self.assertTextById('name-header', 'Lorem Ipsum')

    # TEST - DELETE RECOVERY METHOD 
    def test_deleteRecoveryMethod(self):
        self.driver.get(profileUrl)
        self.clickButtonByCssSelector('button.md-icon-button', 0)
        self.assertTextById('sure-header', 'Are you sure?')
        self.driver.find_element_by_css_selector('button.md-warn').click() 
        self.assertTextById('name-header', 'Lorem Ipsum')
        self.clickButtonByCssSelector('button.md-icon-button', 0)
        self.assertTextById('sure-header', 'Are you sure?')
        self.driver.find_element_by_css_selector('button.md-accent').click() 
        self.assertTextById('name-header', 'Lorem Ipsum')

    # TEST - HELP CENTER
    def test_helpCenter(self):
        self.driver.get(profileUrl)
        self.clickButtonByCssSelector('a.md-icon-button', 0)
        self.assertTextById('help-header', 'Help center')

if __name__ == '__main__':
    unittest.main()