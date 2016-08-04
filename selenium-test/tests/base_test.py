import os
import unittest
import sys
import new
from selenium import webdriver
from sauceclient import SauceClient

browsers = [{
       'platform': "Windows 10",
       'browserName': "MicrosoftEdge",
       'version': "latest",
    }]

# This decorator is required to iterate over browsers
def on_platforms(platforms):
    def decorator(base_class):
        module = sys.modules[base_class.__module__].__dict__
        for i, platform in enumerate(platforms):
            d = dict(base_class.__dict__)
            d['desired_capabilities'] = platform
            name = "%s_%s" % (base_class.__name__, i + 1)
            module[name] = new.classobj(name, (base_class,), d)

    return decorator


class BaseTest(unittest.TestCase):
    username = os.environ.get('SAUCE_USERNAME')
    access_key = os.environ.get('SAUCE_ACCESS_KEY')
    selenium_port = 'localhost'
    selenium_host = '4445'
    upload = True
    tunnel_id = None
    build_tag = None

    # setUp runs before each test case
    def setUp(self):
        self.desired_capabilities['name'] = self.id()

        if BaseTest.tunnel_id:
            self.desired_capabilities['tunnel-identifier'] = BaseTest.tunnel_id
        if BaseTest.build_tag:
            self.desired_capabilities['build'] = BaseTest.build_tag

        self.driver = webdriver.Remote(
                command_executor="http://%s:%s@%s:%s/wd/hub" %
                                 (BaseTest.username,
                                  BaseTest.access_key,
                                  BaseTest.selenium_host,
                                  BaseTest.selenium_port),
                desired_capabilities=self.desired_capabilities)

    # tearDown runs after each test case
    def tearDown(self):
        self.driver.quit()
        sauce_client = SauceClient(BaseTest.username, BaseTest.access_key)
        status = (sys.exc_info() == (None, None, None))
        sauce_client.jobs.update_job(self.driver.session_id, passed=status)
        test_name = "%s_%s" % (type(self).__name__, self.__name__)
        with(open(test_name + '.testlog', 'w')) as outfile:
            outfile.write("SauceOnDemandSessionID=%s job-name=%s\n" % (self.driver.session_id, test_name))

    @classmethod
    def setup_class(cls):
        cls.build_tag = os.environ.get('BUILD_TAG', None)
        cls.tunnel_id = os.environ.get('TUNNEL_IDENTIFIER', None)
        cls.username = os.environ.get('SAUCE_USERNAME', None)
        cls.access_key = os.environ.get('SAUCE_ACCESS_KEY', None)

        cls.selenium_port = os.environ.get("SELENIUM_PORT", None)
        if cls.selenium_port:
            cls.selenium_host = "localhost"
        else:
            cls.selenium_host = "ondemand.saucelabs.com"
            cls.selenium_port = "80"
