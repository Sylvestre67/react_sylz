import json
import re

def scrap():
    """
    Opens the game.json, parse it and retrieve all plays corresponding to the assisted shot made.
    Extracts the name of the passer and shooter, and appends it to a list of plays.

    From: http://stats.nba.com/stats/playbyplayv2?EndPeriod=10&EndRange=55800&GameID=0021700509&RangeType=2&Season=2017-18&SeasonType=Regular+Season&StartPeriod=1&StartRange=0
    :return: array of plays
    """
    assist = re.compile(r' \([A-Z][a-z]+ [1-9]+ AST\)$')
    passer_name = re.compile(r' \([A-Za-z\']+')
    shooter_name = re.compile(r'^[A-Za-z\']+')
    output = dict()
    output['_all_assists'] = list()
    output['total_assist'] = 0
    output_v2 = []
    all_players = []

    game = json.load(open('playbyplayv2.json'))

    plays = game['resultSets'][0]['rowSet']

    # Filter plays to only include the made shot
    plays = filter(lambda play: play[9] != None and assist.search(play[9]), plays)
    for play in plays:
        play_description = play[9]
        passer = passer_name.search(play_description).group().replace(' (', '')
        shooter = shooter_name.search(play_description).group()

        if not passer in all_players:
            all_players.append(passer)

        if not shooter in all_players:
            all_players.append(shooter)

        if not passer in output:
            output[passer] = {
                'pass_to': [],
                'pass_from': []
            }

        if not shooter in output:
            output[shooter] = {
                'pass_to': [],
                'pass_from': []
            }

        if not passer in all_players:
            all_players.append(passer)

        if not shooter in all_players:
            all_players.append(shooter)

        try:
            output[passer]['pass_to'].append(shooter)
        except:
            print(passer)

        try:
            output[shooter]['pass_from'].append(passer)
        except:
            print(shooter)

    for player in all_players:
        print('************ ' + player)
        new_player = {'_name': player, 'assists': []}

        for passer in all_players:
            pass_from = output[player]['pass_from'].count(passer)
            pass_to = output[player]['pass_to'].count(passer)

            new_player['assists'].append({'name': passer, 'pass_to': pass_from, 'pass_from': pass_to})

        output_v2.append(new_player)

    with open('../static/assists.json', 'w') as outfile:
        json.dump(output_v2, outfile, sort_keys=True, indent=4)

    with open('../public/api/nba/assists.json', 'w') as outfile:
        json.dump(output_v2, outfile, sort_keys=True, indent=4)


if __name__ == "__main__":
    scrap()
