import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import setupGame from '@/views/setup-game'

describe('SetupGame.vue', () => {
  it('sets join data to true', () => {
    let wrapper = mount(setupGame);
    wrapper.vm.joinGame();
    expect(wrapper.vm.join).to.equal(true);
  });
  it('sets start data to true', () => {
    const wrapper = mount(setupGame);
    wrapper.vm.startGame();
    expect(wrapper.vm.start).to.equal(true);
  });
  it('resets start and join data to false', () => {
    const wrapper = mount(setupGame);
    wrapper.vm.reset();
    expect(wrapper.vm.start).to.equal(false);
    expect(wrapper.vm.join).to.equal(false);
  });
});
