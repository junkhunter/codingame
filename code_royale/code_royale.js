/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

class  site
{
    constructor(site_id, x, y, radius=0, ignore_1=0, ignore_2=0, structure_type=0, owner=0, param_1=0, param_2=0)
    {
        this.site_id = site_id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.ignore_1 = ignore_1;
        this.ignore_2 = ignore_2;
        this.structure_type = structure_type;
        this.owner = owner;
        this.param_1 = param_1;
        this.param_2 = param_2;
    }
};

class unit
{
    constructor(x, y, owner, unit_type, health)
    {
        this.x = x;
        this.y = y;
        this.owner = owner;
        // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER
        this.unit_type = unit_type;
        this.health = health;
    }
};

let sites = {}, my_sites = [], our_sites = [];

const numSites = +readline();
for (let i = 0; i < numSites; i++) {
    var inputs = readline().split(' ');
    const siteId = +inputs[0];
    const x = +inputs[1];
    const y = +inputs[2];
    const radius = +inputs[3];
    sites[siteId] = new site(siteId, x, y, radius);
}

while (true) {
    var inputs = readline().split(' ');
    const gold = +inputs[0];
    const touchedSite = +inputs[1]; // -1 if none
    my_sites = [], our_sites = [], un_sites = [];

    let units = {}, my_units = {}, our_units = {};
    for (let i = 0; i < numSites; i++) {
        var inputs = readline().split(' ');
        const siteId = +inputs[0];
        const ignore1 = +inputs[1]; // used in future leagues
        const ignore2 = +inputs[2]; // used in future leagues
        const structureType = +inputs[3]; // -1 = No structure, 1 = Tower, 2 = Barracks
        const owner = +inputs[4]; // -1 = No structure, 0 = Friendly, 1 = Enemy
        const param1 = +inputs[5];
        const param2 = +inputs[6];

		sites[siteId] = new site(sites[siteId].siteId, sites[siteId].x, sites[siteId].y, sites[siteId].radius , ignore1, ignore2, structureType, owner, param1, param2);
        switch (owner)
        {
            case 0:
                my_sites.push(siteId);
                break;
            case 1:
                our_sites.push(siteId);
                break;
            default:
                un_sites.push(siteId);
                break;
        }
    }
    let my_queen
    const numUnits = +(readline());
    units = {"queen" : [],
            "knight" : [],
            "archer" : [],
            "giant" : []};
    my_units = {"queen" : [],
            "knight" : [],
            "archer" : [],
            "giant" : []};
    our_units = {"queen" : [],
            "knight" : [],
            "archer" : [],
            "giant" : []};
    for (let i = 0; i < numUnits; i++) {
        var inputs = readline().split(' ');
        const x = +inputs[0];
        const y = +inputs[1];
        const owner = +inputs[2];
        const unitType = +inputs[3]; // -1 = QUEEN, 0 = KNIGHT, 1 = ARCHER, 2 = GIANT
        const health = +inputs[4];

        switch (unitType)
        {
            case -1:
                units["queen"].push(new unit(x, y, owner, unitType, health));
                break;
            case 0:
                units["knight"].push(new unit(x, y, owner, unitType, health));
                break;
            case 1:
                units["archer"].push(new unit(x, y, owner, unitType, health));
                break;
            default:
                units["giant"].push(new unit(x, y, owner, unitType, health));
                break;
        }
    }
    my_units["queen"]   =  units["queen"].filter((x)=>{return (!x.owner)});
    my_units["knight"]  = units["knight"].filter((x)=>{return (!x.owner)});
    my_units["archer"]  = units["archer"].filter((x)=>{return (!x.owner)});
    my_units["giant"]   =  units["giant"].filter((x)=>{return (!x.owner)});
    our_units["queen"]  =  units["queen"].filter((x)=>{return (x.owner)});
    our_units["knight"] = units["knight"].filter((x)=>{return (x.owner)});
    our_units["archer"] = units["archer"].filter((x)=>{return (x.owner)});
    our_units["giant"]  =  units["giant"].filter((x)=>{return (x.owner)});

    // console.debug(my_units);
    // console.debug(our_units);

    console.log('WAIT');
    console.log('TRAIN');
}