
var jslear = (function(){

    var cultures = new Array();
    
    function addCulture(culture){
        cultures.push(culture);
    }

    function Actor(){
        // State
        this.state = "Normal";
        
        // Wire Methods
        this.hasTrait = hasTrait;
        this.die = die;
        this.setStat = setStat;
        this.stat = getStat;
        this.addEffect = addEffect;
        this.addTrait = addTrait;
        this.setTraits = setTraits;
    
        // Set Culture
        this.culture = randFromList(cultures);
        this.cultureName = this.culture.Name;
        
        // Set Gender
        this.gender = randFromList(this.culture.Genders);
        this.genderName = this.gender.Name;

        // Set Image
        this.image = this.gender.Image;

        // Set Name
        this.firstName = randFromList(this.gender.Names);
        this.familyName = randFromList(this.culture.FamilyNames)
        this.fullName = this.firstName + " " + this.familyName;
        
        // Set Class
        this.class = randFromList(this.culture.Classes);        

        // Set Stats
        this.stats = new Array();
        this.setStat("age", getAge(20, 60));
        this.setStat("income", random(this.class.Income, this.class.Income+20));
        this.setStat("wealth", random((this.stat("income") * 2), (this.stat("income") * 3) ));
        this.setStat("health", random(0, 30));

        // Set Traits
        this.traits = new Array();
        this.setTraits();

        // Set Effects
        this.effects = new Array();

    }

    function addEffect(effect){
        if ( ! isInList(effect, this.effects) ){ 
            this.effects.push(effect);
        }
    }
    
    function addTrait(trait){
        if ( ! isInList(trait, this.traits) ){ 
            this.traits.push(trait);
        }
    }

    function getStat(key){
        return this.stats[key];
    }

    function die(){
        this.state = "Dead";
    }

    function setStat(stat, value){
        this.stats[stat] = value;
    }

    function hasTrait(trait){
        return isInList(trait, this.traits);    
    }

    function isInList(thing, list){
        var is = false;    
        for ( var i = 0; i < list.length; i++ ){
            if ( list[i] == thing ){
                is = true;
            }        
        }
        return is;
    }

    function setTraits(){
        var list = getTraits();
        for ( var i = 0; i < list.length; i++){
            this.addTrait(list[i]);      
        }        
    }

    function getTraits(){
        var traits = ["Weak", "Immoral", "Greedy", "Frugal", "Spender", "Adventurous", "Bright", "Calm", "Charming", "Generous", "Aggressive", "Clumsy", "Crafty", "Dishonest", "Honest", "Evil", "Foolish", "Gentle", "Hard-working", "Optimist", "Pesimist", "Jealous", "Liar", "Obese", "Power Hungry", "Patriotic", "Loyal", "Selfish", "Talented", "Handsome", "Ugly", "Violent"];
        var no = random(2,3);
        var list = new Array();
        for ( var i = 0; i < no; i++){
            list.push(randFromList(traits));      
        }
        return list;
    }


    function getAge(min, max){
        return random(min, max);
    }
    
    function random(min, max){
        return Math.floor((Math.random()*((max+1)-min))+min);
    }
    
    function randFromList(list){
        return list[random(0,list.length-1)];    
    }
    
    return {
	    Actor: Actor,
	    addCulture: addCulture,
	}

}())
