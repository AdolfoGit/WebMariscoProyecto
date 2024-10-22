import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class DetailsThumb extends Component {
  render() {
    const { images, tab, myRef } = this.props;

    return (
      <div className="thumb" ref={myRef}>
        {images.map((img, index) => (
          <img
            src={img}
            alt=""
            key={index}
            onClick={() => tab(index)}
          />
        ))}
      </div>
    );
  }
}

DetailsThumb.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired, // Validar que `images` es un array de strings y es obligatorio
  tab: PropTypes.func.isRequired, // Validar que `tab` es una función y es obligatorio
  myRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired, // Validar que `myRef` puede ser una función o un objeto `ref` y es obligatorio
};

export default DetailsThumb;
