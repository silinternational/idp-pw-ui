from .base_test import *
import time

@on_platforms(browsers)
class SeTest(BaseTest):

    # def assertTextByTag(self, tag, text):
    #     max_attempts = 3
    #     while (max_attempts > 0):
    #         try:
    #             name = self.driver.find_element_by_tag_name(tag)
    #             assert text in name.text
    #             break
    #         except:
    #             time.sleep(2)
    #             max_attempts -= 1
    #     raise AssertionError

    # def clickButtonById(self, html_id):
    #     max_attempts = 3
    #     while (max_attempts > 0):
    #         try:
    #             print "yo"
    #             self.driver.find_element_by_id(html_id).click()
    #             break
    #         except:
    #             print sys.exc_info()
    #             time.sleep(2)
    #             max_attempts -= 1
    #     raise AssertionError

    @classmethod
    def setup_class(cls):
        BaseTest.setup_class()
        global profileUrl
        global forgotUrl
        profileUrl = "http://192.168.99.100:9000/#/profile"
        forgotUrl = "http://192.168.99.100:9000/#/forgot"

    # TEST - CHANGE PASSWORD
    def test_changePassword(self):
        self.driver.get(profileUrl)
        time.sleep(5)
        #self.clickButtonById('change-btn')
        #self.assertTextByTag('h2', 'Change password')
        self.driver.find_element_by_id('change-btn').click()
        name = self.driver.find_element_by_tag_name('h2')
        assert_equals(name.text, "Change password")
        #element = self.driver.find_element_by_id('min-char-requirement')
        element = self.driver.find_element_by_id("password")
        element.send_keys("askldjfiaweurxvk234")
        element = self.driver.find_element_by_id("pwagain")
        element.send_keys("askldjfiaweurxvk234")
        self.driver.find_element_by_id('change-btn').click() 
        time.sleep(2)
        name = self.driver.find_element_by_id('successful-header')
        assert name.text == "Update successful" 
        # self.driver.find_element_by_id('ok-btn').click() 
        # time.sleep(2)
        # name = self.driver.find_element_by_id('name-header')
        # assert name.text == "Lorem Ipsum" 
        # self.driver.find_element_by_id('change-btn').click() 
        # time.sleep(2)
        # self.driver.find_element_by_id('cancel-btn').click() 
        # time.sleep(2)
        # name = self.driver.find_element_by_id('name-header')
        # assert name.text == "Lorem Ipsum"

    # TEST - RESET PASSWORD (USE ALTERNATE METHODS)
    # def test_resetPassword1(self): 
    #     self.driver.get(forgotUrl)
    #     time.sleep(2)
    #     element = self.driver.find_element_by_id("forgot-description")
    #     assert "ACME Inc" in element.text 
    #     element = self.driver.find_element_by_id("hint-label")
    #     assert element.text == "Acme username, ex: first_last"
    #     element = self.driver.find_element_by_id("username")
    #     element.send_keys("username1")
    #     self.driver.find_element_by_id('continue-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('reset-header')
    #     assert name.text == "Password reset email sent" 
    #     self.driver.find_element_by_id('methods-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_tag_name('h2')
    #     assert name.text == "Alternate verification" 
    #     self.driver.find_elements_by_css_selector('button.md-icon-button')[0].click() 
    #     time.sleep(2)
    #     self.driver.find_element_by_id('close-dialog').click() 
    #     time.sleep(2)
    #     self.driver.find_elements_by_css_selector('button.md-icon-button')[0].click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('verification-header')
    #     assert name.text == "Verification code sent" 
    #     element = self.driver.find_element_by_name("verificationCode")
    #     element.send_keys("123")
    #     self.driver.find_element_by_id('verify-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_tag_name('h2')
    #     assert name.text == "Change password" 

    # # TEST - RESET PASSWORD (RESEND)
    # def test_resetPassword2(self): 
    #     self.driver.get(forgotUrl)
    #     time.sleep(2)
    #     element = self.driver.find_element_by_id("username")
    #     element.send_keys("username1")
    #     self.driver.find_element_by_id('continue-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('reset-header')
    #     assert name.text == "Password reset email sent" 
    #     self.driver.find_element_by_id('resend-btn').click()
    #     time.sleep(2) 
    #     name = self.driver.find_element_by_id('reset-header')
    #     assert name.text == "Password reset email sent" 

    # # TEST - RESET PASSWORD 
    # def test_resetPassword3(self): 
    #     self.driver.get(forgotUrl)
    #     time.sleep(2)
    #     element = self.driver.find_element_by_id("username")
    #     element.send_keys("username1")
    #     self.driver.find_element_by_id('continue-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('reset-header')
    #     assert name.text == "Password reset email sent" 
    #     self.driver.find_element_by_id('done-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('name-header')
    #     assert name.text == "Lorem Ipsum" 

    # # TEST - ADD RECOVERY METHOD (EMAIL)
    # def test_addEmailRecoveryMethod(self):
    #     self.driver.get(profileUrl)
    #     time.sleep(2)
    #     self.driver.find_element_by_id('add-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_tag_name('h2')
    #     assert name.text == "Add recovery method" 
    #     element = self.driver.find_element_by_id("email")
    #     element.send_keys("a@b.com")
    #     self.driver.find_element_by_id('add-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_tag_name('h2')
    #     assert name.text == "Verify code"
    #     self.driver.find_element_by_id('resend-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_tag_name('h2')
    #     assert name.text == "Verify code"
    #     element = self.driver.find_element_by_name("verificationCode")
    #     element.send_keys("123")
    #     self.driver.find_element_by_id('verify-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('successful-header')
    #     assert name.text == "Update successful" 
    #     self.driver.find_element_by_id('ok-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('name-header')
    #     assert name.text == "Lorem Ipsum" 
    #     self.driver.find_element_by_id('add-btn').click() 
    #     time.sleep(2)
    #     self.driver.find_element_by_id('cancel-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('name-header')
    #     assert name.text == "Lorem Ipsum"

    # # TEST - ADD RECOVERY METHOD (PHONE)
    # def test_addPhoneRecoveryMethod(self):
    #     self.driver.get(profileUrl)
    #     time.sleep(2)
    #     self.driver.find_element_by_id('add-btn').click()
    #     time.sleep(2)
    #     name = self.driver.find_element_by_tag_name('h2')
    #     assert name.text == "Add recovery method" 
    #     self.driver.find_elements_by_tag_name('md-radio-button')[1].click()
    #     time.sleep(2)
    #     element = self.driver.find_element_by_id("phone")
    #     element.send_keys("7777777")
    #     self.driver.find_element_by_id('add-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_tag_name('h2')
    #     assert name.text == "Verify code"
    #     element = self.driver.find_element_by_name("verificationCode")
    #     element.send_keys("123")
    #     self.driver.find_element_by_id('verify-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('successful-header')
    #     assert name.text == "Update successful" 
    #     self.driver.find_element_by_id('ok-btn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('name-header')
    #     assert name.text == "Lorem Ipsum" 

    # # TEST - DELETE RECOVERY METHOD 
    # def test_deleteRecoveryMethod(self):
    #     self.driver.get(profileUrl)
    #     time.sleep(2)
    #     self.driver.find_elements_by_css_selector('button.md-icon-button')[0].click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('sure-header')
    #     assert name.text == "Are you sure?" 
    #     self.driver.find_element_by_css_selector('button.md-warn').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('name-header')
    #     assert name.text == "Lorem Ipsum" 
    #     self.driver.find_elements_by_css_selector('button.delete-btn')[0].click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('sure-header')
    #     assert name.text == "Are you sure?" 
    #     self.driver.find_element_by_css_selector('button.md-accent').click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('name-header')
    #     assert name.text == "Lorem Ipsum" 

    # # TEST - HELP CENTER
    # def test_helpCenter(self):
    #     self.driver.get(profileUrl)
    #     time.sleep(2)
    #     self.driver.find_elements_by_css_selector('a.md-icon-button')[0].click() 
    #     time.sleep(2)
    #     name = self.driver.find_element_by_id('help-header')
    #     assert name.text == "Help center" 

if __name__ == '__main__':
    unittest.main()