import React from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

import Modal from "../UI/Modal/Modal";
import pageBackground from "../assets/pageBackground.png";
import ashFront from "../assets/ashFront.png";
import SideBar from "../components/sideBar";
import searchTooltip from "../assets/searchTooltip.png";
import searchingTooltip from "../assets/searchingTooltip.png";
import ashLeft from "../assets/ashLeftLeg.png";
import ashRight from "../assets/ashRightLeg.png";

const ChangeAnimation = keyframes`  
  from {background-image: url(${ashLeft}); }
  to { background-image: url(${ashRight}); }
`;
const DivRunning = styled.div`
  position: relative;
  width: 44px;
  height: 54px;
  margin: 0 auto;
  animation-name: ${ChangeAnimation};
  animation-duration: 0.25s;
  animation-iteration-count: infinite;
`;

const DivLoading = styled.div``;

const ImageLoading = styled.img``;

const ImageSearch = styled.img`
  opacity: 0;
  transition: opacity 0.2s linear;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TooltipElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover > ${ImageSearch} {
    opacity: 1;
  }
`;

const ImageAshFront = styled.img`
  cursor: pointer;
`;

const DivPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  background-image: url(${pageBackground});
  background-size: cover;
`;

function Map() {
  const [pokemonInfo, setPokemonInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);

  function showPokemon() {
    setPokemonInfo(undefined);
    setPokemonList([...pokemonList, pokemonInfo]);
  }
  async function searchPokemon() {
    setLoading(true);
    const apiPokemon = "https://pokeapi.co/api/v2/pokemon/";
    const idAleatorio = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const response = await fetch(`${apiPokemon}${idAleatorio(1, 807)}/`);
    const data = await response.json();

    const novoPokemon = {
      id: data.id,
      nome: data.name,
      altura: data.height,
      peso: data.types.weight,
      tipos: data.types,
      habilidades: data.abilities,
    };

    setTimeout(() => {
      setLoading(false);
      setPokemonInfo(novoPokemon);
    }, 5000);
  }
  console.log(pokemonInfo);

  return (
    <DivPage>
      <SideBar></SideBar>
      <Container>
        {!loading && (
          <TooltipElement>
            <ImageSearch src={searchTooltip}></ImageSearch>
            <ImageAshFront
              onClick={searchPokemon}
              src={ashFront}
            ></ImageAshFront>
          </TooltipElement>
        )}

        {pokemonInfo && (
          <Modal isOpen={pokemonInfo}>
            <p>{pokemonInfo.nome}</p>
            <p>{pokemonInfo.altura}</p>
            {/* <p>{pokemonInfo.peso}</p>
            <p>{pokemonInfo.tipos}</p>
            <p>{pokemonInfo.habilidades}</p> */}
            <button onClick={showPokemon}> fechar </button>
          </Modal>
        )}

        <ul>
          {pokemonList.map((pokemon) => {
            return <li>{pokemon.id}</li>;
          })}
        </ul>

        {loading && (
          <DivLoading>
            <ImageLoading src={searchingTooltip}></ImageLoading>
            <DivRunning></DivRunning>
          </DivLoading>
        )}
      </Container>
    </DivPage>
  );
}

export default Map;
