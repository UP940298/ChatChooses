import requests
from bs4 import BeautifulSoup

headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
}

url = ['https://www.trueachievements.com/xbox-one/games/a',
       'https://www.trueachievements.com/xbox-one/games/b',
       'https://www.trueachievements.com/xbox-one/games/c',
       'https://www.trueachievements.com/xbox-one/games/d',
       'https://www.trueachievements.com/xbox-one/games/e',
       'https://www.trueachievements.com/xbox-one/games/f',
       'https://www.trueachievements.com/xbox-one/games/g',
       'https://www.trueachievements.com/xbox-one/games/h',
       'https://www.trueachievements.com/xbox-one/games/i',
       'https://www.trueachievements.com/xbox-one/games/j',
       'https://www.trueachievements.com/xbox-one/games/k',
       'https://www.trueachievements.com/xbox-one/games/l',
       'https://www.trueachievements.com/xbox-one/games/m',
       'https://www.trueachievements.com/xbox-one/games/n',
       'https://www.trueachievements.com/xbox-one/games/o',
       'https://www.trueachievements.com/xbox-one/games/p',
       'https://www.trueachievements.com/xbox-one/games/q',
       'https://www.trueachievements.com/xbox-one/games/r',
       'https://www.trueachievements.com/xbox-one/games/s',
       'https://www.trueachievements.com/xbox-one/games/t',
       'https://www.trueachievements.com/xbox-one/games/u',
       'https://www.trueachievements.com/xbox-one/games/v',
       'https://www.trueachievements.com/xbox-one/games/w',
       'https://www.trueachievements.com/xbox-one/games/x',
       'https://www.trueachievements.com/xbox-one/games/y',
       'https://www.trueachievements.com/xbox-one/games/z',
       'https://www.trueachievements.com/xbox-one/games/0']

listText = open("gamelist.txt", "w")

for i in range(len(url)):

    req = requests.get(url[i], headers)
    soup = BeautifulSoup(req.content, 'html.parser')

    for item in soup.findAll('td', attrs={'class': 'game'}):
        listText.write(item.find('a').get_text().lower())
        listText.write("\n")
