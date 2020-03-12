import sys
import math

class  site:
    def __init__(self, site_id, x, y, radius=0, ignore_1=0, ignore_2=0, structure_type=0, owner=0, param_1=0, param_2=0):
        self.site_id = site_id
        self.pos = [x, y]
        self.x = x
        self.y = y
        self.radius = radius
        self.ignore_1 = ignore_1
        self.ignore_2 = ignore_2
        self.structure_type = structure_type
        self.owner = owner
        self.param_1 = param_1
        self.param_2 = param_2

class unit:
    def __init__(self, x, y, owner, unit_type, health):
        self.x = x
        self.y = y
        self.owner = owner
        # -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
        self.unit_type = unit_type
        self.health = health

sites = {}
my_sites = []
our_sites = []

turn = 1

last_turn = 0
memo_turn_rep = 0
def menaced(my_queen, our_units):
    global last_turn
    global memo_turn_rep

    if last_turn != turn:
        rep = 0
        for k in our_units['knight']:
            if dist(*k.pos, *my_queen.pos) <= 300:
                rep = 1
                break
        memo_turn_rep = rep
        last_turn = turn
    return memo_turn_rep

def integer_sqrt(x):
    if x == 0:
        return 0
    else:
        r2 = 2 * (integer_sqrt(x // 4))
        r3 = r2 + 1
        return r2 if (x) < (r3 * r3) else r3

def dist(x1, y1, x2, y2):
    x_diff = x2 - x1
    y_diff = y2 - y1
    return int(integer_sqrt(x_diff * x_diff + y_diff * y_diff))


def best_pos(my_queen, our_units):
    minimap = [[0] * 1920 for _ in range(1000)]

    def edit_minimap(kx, ky):
        for y in range(600):
            for x in range(600):
                d = dist(kx - x, ky - y, kx, ky)
                if d <= 600:
                    minimap[y][x] += d
    for k in our_units['knight']:
        if dist(*k.pos, *my_queen.pos) <= 300:
            edit_minimap(*k.pos)

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.

num_sites = int(input())
for i in range(num_sites):
    site_id, x, y, radius = [int(j) for j in input().split()]
# game loop
while True:
    # touched_site: -1 if none

    gold, touched_site = [int(i) for i in input().split()]
    my_sites = []
    our_sites = []
    un_sites = []
    for i in range(num_sites):
        # ignore_1: used in future leagues
        # ignore_2: used in future leagues
        # structure_type: -1 = No structure, 1 = Tower, 2 = Barracks
        # owner: -1 = No structure, 0 = Friendly, 1 = Enemy
        site_id, ignore_1, ignore_2, structure_type, owner, param_1, param_2 = [int(j) for j in input().split()]
        sites[site_id] = site(sites[site_id].site_id, sites[site_id].x, sites[site_id].y, sites[site_id].radius, ignore_1, ignore_2, structure_type, owner, param_1, param_2)
        {0 : my_sites, 1 : our_sites, -1 : un_sites}[owner].append(site_id)
    num_units = int(input())
    units = {"queen" : [],
            "knight" : [],
            "archer" : [],
            "giant" : []}
    my_units = dict(units)
    our_units = dict(units)

    for i in range(num_units):
        # unit_type: -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER, 2 = GIANT
        # x, y, owner, unit_type, health = [int(j) for j in input().split()]
        Unit = unit(*[int(j) for j in input().split()])
        utype = {-1: "queen", 0: "knight", 1: "archer", 2: "giant"}[Unit.unit_type]
        units[utype].append(Unit)
        {0: my_units, 1: our_units}[Unit.owner][utype].append(Unit)
    queen_action = 'WAIT'
    if menaced(my_units["queen"], our_units):
        queen_action = 'MOVE {} {}'.format(*best_pos(my_units["queen"], our_units))
    else:
        next_site = min([s for s in sites.values() if s.owner != 0], key = lambda x : dist(*my_units["queen"].pos, *x.pos))
        queen_action = 'BUILD {} TOWER'.format(next_site.site_id)
    # Write an action using print
    # To debug: print("Debug messages...", file=sys.stderr)


    # First line: A valid queen action
    # Second line: A set of training instructions
    print("WAIT")
    print("TRAIN")
    turn = 1 - turn