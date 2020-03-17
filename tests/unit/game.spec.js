import { expect } from "chai";
import sinon from 'sinon'
import { shallowMount } from "@vue/test-utils";
import game from "@/views/game"

describe("game component", () => {
  it("if gameId is undefined calls endGame", () => {
      let stub = sinon.stub()
      shallowMount(game,{propsData:{
          gameId: undefined,
          playerId: 'playerOne'
      },methods:{
        endGame: stub
      }});
      expect(stub.called).to.equal(true)
  });
  it("if playerId is playerOne the opponentId is playerTwo", () => {
   let wrapper= shallowMount(game,{propsData:{
        gameId: undefined,
        playerId: 'playerOne'
    },methods:{
      endGame: sinon.stub()
    }});
    expect(wrapper.vm.opponentId).to.equal('playerTwo')
});
});
