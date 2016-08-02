from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

import os

SAUCE_USERNAME = 'johnlee11'
SAUCE_ACCESS_KEY = 'e755b5c9-a639-4e34-926d-dff156ea1a62'


# The command_executor tells the test to run on Sauce, while the desired_capabilities
# parameter tells us which browsers and OS to spin up.
desired_cap = {
   'platform': "Mac OS X 10.9",
   'browserName': "chrome",
   'version': "31",
}
driver = webdriver.Remote(
  command_executor='http://'+SAUCE_USERNAME+':'+SAUCE_ACCESS_KEY+'@localhost:4445/wd/hub',
  desired_capabilities=desired_cap)


# This is your test logic. You can add multiple tests here.

driver.implicitly_wait(20)

# TEST - CHANGE PASSWORD
def changePassword():
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Change password" 
	element = driver.find_element_by_id("password")
	element.send_keys("askldjfiaweurxvk234")
	element = driver.find_element_by_id("pwagain")
	element.send_keys("askldjfiaweurxvk234")
	driver.find_elements_by_css_selector('button.md-button')[2].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Update successful" 
	driver.find_elements_by_css_selector('button.md-button')[3].click() 
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Billy Clark" 
	driver.find_elements_by_css_selector('a.md-button')[1].click() 
	driver.find_elements_by_css_selector('button.md-button')[1].click() 
	time.sleep(7)
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Billy Clark"

# TEST - RESET PASSWORD (USE ALTERNATE METHODS)
def resetPassword1(): 
	driver.get("http://192.168.99.100:9000/#/forgot")
	element = driver.find_element_by_id("username")
	element.send_keys("username1")
	driver.find_elements_by_css_selector('button.md-button')[1].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Password reset email sent" 
	driver.find_elements_by_css_selector('button.md-accent')[0].click() 
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Alternate verification" 
	driver.find_elements_by_css_selector('button.md-icon-button')[0].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Verification code sent" 
	element = driver.find_element_by_name("verificationCode")
	element.send_keys("123")
	driver.find_elements_by_css_selector('button.md-primary')[0].click() 
	time.sleep(7)
	changePassword()

# TEST - RESET PASSWORD (RESEND)
def resetPassword2(): 
	driver.get("http://192.168.99.100:9000/#/forgot")
	element = driver.find_element_by_id("username")
	element.send_keys("username1")
	driver.find_elements_by_css_selector('button.md-button')[1].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Password reset email sent" 
	driver.find_elements_by_css_selector('button.md-warn')[0].click() 
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Password reset email sent" 

# TEST - RESET PASSWORD 
def resetPassword3(): 
	driver.get("http://192.168.99.100:9000/#/forgot")
	element = driver.find_element_by_id("username")
	element.send_keys("username1")
	driver.find_elements_by_css_selector('button.md-button')[1].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Password reset email sent" 
	driver.find_elements_by_css_selector('button.md-primary')[1].click() 
	time.sleep(7)
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Billy Clark" 

# TEST - ADD RECOVERY METHOD (EMAIL)
def addEmailRecoveryMethod():
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Add recovery method" 
	element = driver.find_element_by_id("email")
	element.send_keys("a@b.com")
	driver.find_elements_by_css_selector('button.md-button')[2].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[0]
	assert name.text == "Verify code"
	element = driver.find_element_by_name("verificationCode")
	element.send_keys("1234")
	driver.find_elements_by_css_selector('button.md-button')[2].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Update successful" 
	driver.find_elements_by_css_selector('button.md-button')[3].click() 
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Billy Clark" 
	driver.find_elements_by_css_selector('a.md-button')[2].click() 
	driver.find_elements_by_css_selector('button.md-accent')[0].click() 
	time.sleep(7)
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Billy Clark"

# TEST - ADD RECOVERY METHOD (PHONE)
def addPhoneRecoveryMethod():
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Add recovery method" 
	driver.find_elements_by_tag_name('md-radio-button')[1].click()
	element = driver.find_element_by_id("phone")
	element.send_keys("7777777777")
	driver.find_elements_by_css_selector('button.md-button')[2].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[0]
	assert name.text == "Verify code"
	element = driver.find_element_by_name("verificationCode")
	element.send_keys("1234")
	driver.find_elements_by_css_selector('button.md-button')[2].click() 
	time.sleep(7)
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Update successful" 
	driver.find_elements_by_css_selector('button.md-button')[3].click() 
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Billy Clark" 

# TEST - DELETE RECOVERY METHOD 
def deleteRecoveryMethod():
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Are you sure?" 
	driver.find_element_by_css_selector('button.md-warn').click() 
	time.sleep(7)
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Billy Clark" 
	driver.find_elements_by_css_selector('button.md-icon-button')[0].click() 
	name = driver.find_elements_by_tag_name('h2')[1]
	assert name.text == "Are you sure?" 
	driver.find_element_by_css_selector('button.md-accent').click() 
	time.sleep(7)
	name = driver.find_element_by_tag_name('h2')
	assert name.text == "Billy Clark" 


# RUN TESTS FOR RESET PASSWORD
resetPassword1()
resetPassword2()
resetPassword3()

# RUN TEST FOR CHANGE PASSWORD
driver.get("http://192.168.99.100:9000/#/profile")
time.sleep(7)
driver.find_elements_by_css_selector('a.md-button')[1].click() 
changePassword()

# RUN TEST FOR ADDING EMAIL RECOVERY METHOD 
driver.get("http://192.168.99.100:9000/#/profile")
time.sleep(7)
driver.find_elements_by_css_selector('a.md-button')[2].click() 
addEmailRecoveryMethod()

# RUN TEST FOR ADDING PHONE RECOVERY METHOD 
driver.get("http://192.168.99.100:9000/#/profile")
time.sleep(7)
driver.find_elements_by_css_selector('a.md-button')[2].click() 
addPhoneRecoveryMethod()

# RUN TEST FOR DELETING RECOVERY METHOD 
driver.get("http://192.168.99.100:9000/#/profile")
time.sleep(7)
driver.find_elements_by_css_selector('button.md-icon-button')[0].click() 
deleteRecoveryMethod()


# This is where you tell Sauce Labs to stop running tests on your behalf.
driver.quit()