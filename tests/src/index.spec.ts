// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the MIT License.

import expect = require('expect.js');
import {LineUpModel, LineUpView} from '../../src/';

import {createTestModel} from './utils.spec';


describe('LineUp', () => {

  describe('LineUpModel', () => {

    it('should be createable', () => {
      let model = createTestModel(LineUpModel);
      expect(model).to.be.an(LineUpModel);
      expect(model.get('value')).to.be('Hello World');
    });

    it('should be createable with a value', () => {
      let state = {value: 'Foo Bar!'}
      let model = createTestModel(LineUpModel, state);
      expect(model).to.be.an(LineUpModel);
      expect(model.get('value')).to.be('Foo Bar!');
    });

  });

});
