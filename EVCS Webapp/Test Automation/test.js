/*
	v60-62 Chrome
	should use chromedriver v2.33
*/

const webdriver = require('selenium-webdriver');
var logger = require('winston');
const chrome = require('selenium-webdriver/chrome');
const driver = new webdriver.Builder().forBrowser('chrome').build();
driver.get('http://192.168.0.109:8080/')
var testcaseNum = 5;

for(var i=0; i<testcaseNum; i++) {
	driver.findElement({id: 'menu1'}).click();
	driver.sleep(5000);
	for(var i=0; i< testcaseNum; i++) {
		driver.findElements(webdriver.By.tagName("li")).then(function(elems){
			if(elems) {
				var randomNum = Math.floor(Math.random() * elems.length) + 1;
				elems[randomNum].click();
				driver.sleep(2000);
				driver.findElement({id: 'back'}).click();
				driver.sleep(2000);
			}
		});
	}
	driver.findElement({id: 'home'}).click();
	driver.sleep(1000);
	driver.findElement({id:'next'}).click();
	driver.sleep(1000);
	
	driver.findElement({id:'menu2'}).click();
	driver.sleep(2000);
	driver.findElement({id:'search'}).click();
	driver.sleep(5000);
	for(var i=0; i< testcaseNum; i++) {
		driver.findElements(webdriver.By.tagName("li")).then(function(elems){
			if(elems) {
				var randomNum = Math.floor(Math.random() * elems.length) + 1;
				elems[randomNum].click();
				driver.sleep(2000);
				driver.findElement({id: 'back'}).click();
				driver.sleep(2000);
			}
		});
	}
	driver.findElement({id: 'home'}).click();
	driver.sleep(1000);
	
	driver.findElement({id:'next'}).click();
	driver.sleep(1000);
	driver.findElement({id:'next'}).click();
	driver.sleep(1000);	
	driver.findElement({id:'menu3'}).click();
	driver.sleep(2000);
	driver.findElement({id: 'home'}).click();
	driver.sleep(1000);
	
	driver.findElement({id:'next'}).click();
	driver.sleep(1000);
	driver.findElement({id:'next'}).click();
	driver.sleep(1000);
	driver.findElement({id:'next'}).click();
	driver.sleep(1000);
	driver.findElement({id:'menu4'}).click();
	driver.findElement({id: 'home'}).click();
	driver.sleep(1000);
}
driver.quit();
