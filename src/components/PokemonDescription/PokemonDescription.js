import React, {Component} from 'react';
import axios from 'axios';
import classes from './PokemonDescription.css';

class PokemonDescription extends Component{

    state  = {
        description: null
    };

    localDescription(){
        this.setState({description: 'There is a bud on this Pokémon\'s back. To support its weight, Ivysaur\'s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it\'s a sign that the bud will bloom into a large flower soon.'})
    }

    componentWillReceiveProps(nextProps){
        if (this.props.pokemonId !== nextProps.pokemonId || this.props.activeVersion !== nextProps.activeVersion){
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + nextProps.pokemonId + '/')
                .then(res => {
                    //later add des switch from saph + ruby
                    let onlyEnglishDes = res.data.flavor_text_entries.filter(des => des.language.name === 'en');
                    //console.log(onlyEnglishDes);
                    let randomEngDes = onlyEnglishDes[Math.floor(Math.random() * onlyEnglishDes.length)];
                    this.setState({description: randomEngDes.flavor_text});
                })
                .catch(error => console.log(error));
        }
    }

    componentWillMount(){
        this.localDescription();
        /*axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.props.pokemonId + '/')
            .then(res => {
                let onlyEnglishDes = res.data.flavor_text_entries.filter(des => des.language.name === 'en');
                //console.log(this.props.activeVersion);
                //console.log(onlyEnglishDes);
                let randomEngDes = onlyEnglishDes[Math.floor(Math.random() * onlyEnglishDes.length)];
                this.setState({description: randomEngDes.flavor_text});
            })
            .catch(error => console.log(error));
        */
    }
    
    render(){
        return (
           <div className={classes.PokemonDes}>
              <p>{this.state.description}</p>
              {this.props.activeVersion}
           </div>
        );
    }

}

export default PokemonDescription;