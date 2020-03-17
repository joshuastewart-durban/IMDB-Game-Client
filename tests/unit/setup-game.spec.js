import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import setupGame from '@/views/setup-game'
import joinGame from '@/components/join-game'

describe('SetupGame.vue', () => {
  it('renders joinGame component', () => {
    const wrapper = shallowMount(setupGame, {
      propsData: { join: true, start: false },
    });
    expect(wrapper.find(joinGame).exists).to.equal(true);
  });
});
