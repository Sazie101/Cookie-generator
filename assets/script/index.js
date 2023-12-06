'use strict';

import { onEvent, select, print, selectAll } from "./utility.js";

const settings = select('.settings');
const accept = select('.accept');
const preferences = select('.preferences');
const addCookies = select('.addCookies');
const cookieSelect = select('.cookieSettings');
const text = select('.text');
const switches = selectAll('input');
const WindowInfo = window.navigator.userAgent;

const life = 15;

function checkCookies() {
    print(document.cookie ? 'Cookies available' : 'No cookies found');
}

function getWindowInfo() {
    return WindowInfo.includes('Macintosh') ? "OS: Mac/OS" : "OS: Windows";
}

function getBrowser() {
    let browserName = window.navigator.userAgent;
    if (browserName.includes('Edg')) return "Edge";
    if (browserName.includes('OPR')) return "Opera";
    if (browserName.includes('Chrome')) return "Chrome";
    if (browserName.includes('Firefox')) return "Firefox";
}

function setCookie(name, value) {
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue}; path=/; max-age=${life}; SameSite=Lax`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function Allswitches() {
    switches.forEach(selectSwitch => {
        const switchName = selectSwitch.classList[0];

        switch (switchName) {
            case 'browser':
                let browser = getBrowser();
                print(browser);
                setCookie(switchName, browser);
                break;
            case 'os':
                let os = getWindowInfo();
                print(os);
                setCookie(switchName, os);
                break;
            case 'width':
                let width = window.innerWidth;
                print(width);
                setCookie(switchName, width);
                break;
            default:
                let height = window.innerHeight;
                print(height);
                setCookie(switchName, height);
                break;
        }
    });
}

function checkSwitches() {
    if (switches.every(selectSwitch => !selectSwitch.checked)) {
        print("No cookies selected");
    } else {
        switches.forEach(selectSwitch => {
            const switchName = selectSwitch.classList[0];
            const isChecked = selectSwitch.checked;

            if (isChecked) {
                switch (switchName) {
                    case 'browser':
                        let browser = getBrowser();
                        print(browser);
                        setCookie(switchName, browser);
                        break;
                    case 'os':
                        let os = getWindowInfo();
                        print(os);
                        setCookie(switchName, os);
                        break;
                    case 'width':
                        let width = window.innerWidth;
                        print(width);
                        setCookie(switchName, width);
                        break;
                    default:
                        let height = window.innerHeight;
                        print(height);
                        setCookie(switchName, height);
                        break;
                }
            } else {
                console.log(`${switchName}: rejected`);
            }
        });
    }
}

onEvent('click', settings, () => {
    addCookies.style.display = 'none';
    cookieSelect.style.display = 'block';
});

onEvent('click', preferences, () => {
    addCookies.style.display = 'block';
    cookieSelect.style.display = 'none';
    checkSwitches();
});

onEvent('click', accept, () => {
    Allswitches();
});

onEvent('load', window, () => {
    for (const toggle in switches) {
        switches[toggle].checked = true;
    }
    setTimeout(() => {
        addCookies.style.display = 'block';
        text.style.opacity = '0.5';
    }, 2000);
    checkCookies();
});