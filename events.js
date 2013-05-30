

// EFFECTS

EF_SICK = {
    Name: "Sick",
}

EF_THEIF = {
    Name: "Theif",
}

EF_CRIME_VICTIM = {
    Name: "Crime Victim",
}

EF_AGGRESSOR = {
    Name: "Aggressor",
}

EF_ANGRY = {
    Name: "Angry",
}

// Events

SICK = {
    check : function(a){ return ( a.stat("health") < 5 && a.stat("health") > 0 ); },
    status: "get's Sick.",
    trigger: function(a){ a.addEffect(EF_SICK); }
    
}

DIES = {
    check : function(a){ return a.stat("health") == 0; },
    status: "dies.",
    trigger: function(a){ a.die(); }

}

PUNCH = {
    check : function(a){ return a.hasTrait("Aggressive"); },
    status : "punches someone.",
    trigger: function(a){
        // find target
        var target = actors[random(0, actors.length)];
        if ( target ) {         
            console.log(a.fullName + " punches " + target.fullName );
            a.addEffect(EF_AGGRESSOR);
            target.addEffect(EF_CRIME_VICTIM);
            target.addEffect(EF_ANGRY);
        }
    }

}

ROB = {
    check : function(a){ 
        return ( (a.hasTrait("Immoral") || a.hasTrait("Dishonest") ) && a.stat("wealth") < 30 );
    },
    status : " tries to robs.",
    trigger: function(a){
        // find target
        var target;
        for ( var i = 0; i < actors.length; i++ ){
            var actor = actors[i];
            if ( actor.stat("wealth") > 50 ) {
                target = actor;
                break;
            }
        }
        if ( target ) {         
            console.log(a.fullName + " robs " + target.fullName );
            a.setStat("wealth", a.stat("wealth") + 10); 
            a.addEffect(EF_THEIF);
            target.setStat("wealth", target.stat("wealth") - 10); 
            target.addEffect(EF_CRIME_VICTIM);
        }
    }
}


// Decison Support Engine


var events = new Array();

function register_event( event ) {
    events.push(event);
}

// Add Events
register_event(SICK);
register_event(PUNCH);
register_event(DIES);
register_event(ROB);

function random(min, max){
    return Math.floor((Math.random()*((max+1)-min))+min);
}

function run_events(actors){

    for ( var i = 0; i < actors.length; i++ ){
        var actor = actors[i];
        for ( var j = 0; j < events.length; j++ ){
            var event = events[j];
            if ( event.check(actor) ){
                event.trigger(actor);
                console.log(actor.fullName + " " + event.status);
            }
        }    
    }


}


