/* eslint-disable react/require-default-props */
/**
 * Collapse with horizontal collapse
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { FC } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { useTheme, withStyles } from '@mui/styles';

/*
import { duration } from '../styles/transitions';
import { getTransitionProps } from '../transitions/utils'; */

function getTransitionProps(props, options) {
  const { timeout, style = {} } = props;

  return {
    duration:
      style.transitionDuration || typeof timeout === 'number'
        ? timeout
        : timeout[options.mode] || 0,
    delay: style.transitionDelay,
  };
}

const styles: any = (theme) => ({
  /* Styles applied to the container element. */
  container: {
    position: 'relative',
    overflow: 'hidden',
    height: 0,
    transition: theme.transitions.create('height'),
    '&$horizontal': {
      width: 0,
      height: 'auto',
      transition: theme.transitions.create('width'),
    },
  },
  /* Pseudo-class applied to the root element if `orientation="horizontal"`. */
  horizontal: {},
  /* Styles applied to the container element when the transition has entered. */
  entered: {
    height: 'auto',
    overflow: 'visible',
    '&$horizontal': {
      height: 'initial',
      width: '100%',
    },
  },
  /* Styles applied to the container element when the transition has exited and `collapsedHeight` != 0px. */
  hidden: {
    visibility: 'hidden',
  },
  /* Styles applied to the outer wrapper element. */
  wrapper: {
    // Hack to get children with a negative margin to not falsify the height computation.
    display: 'flex',
  },
  /* Styles applied to the inner wrapper element. */
  wrapperInner: {
    width: '100%',
    '&$horizontal': {
      width: '100%',
      height: '100%',
    },
  },
});

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Collapse: any = React.forwardRef(function Collapse(props: any, ref) {
  const {
    children,
    classes,
    className,
    collapsedHeight = '0px',
    collapsedSize: collapsedSizeProp = '0px',
    component: Component = 'div',
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExiting,
    orientation = 'vertical',
    style,
    timeout = 300,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition,
    ...other
  } = props;
  const theme: any = useTheme();
  const timer: any = React.useRef();
  const wrapperRef: any = React.useRef(null);
  const autoTransitionDuration: any = React.useRef();
  const collapsedSizeOrHeight =
    collapsedHeight === '0px' ? collapsedSizeProp : collapsedHeight;
  const collapsedSize =
    typeof collapsedSizeOrHeight === 'number'
      ? `${collapsedSizeOrHeight}px`
      : collapsedSizeOrHeight;
  const isHorizontal = orientation === 'horizontal';
  const size = isHorizontal ? 'width' : 'height';

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleEnter = (node, isAppearing) => {
    // Set absolute position to get the size of collapsed content
    wrapperRef.current.style.position = 'absolute';
    node.style[size] = collapsedSize;

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleEntering = (node, isAppearing) => {
    const wrapperSize =
      wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'];
    // After the size is read reset the position back to default
    wrapperRef.current.style.position = '';

    const { duration: transitionDuration } = getTransitionProps(
      { style, timeout },
      {
        mode: 'enter',
      },
    );

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration =
        typeof transitionDuration === 'string'
          ? transitionDuration
          : `${transitionDuration}ms`;
    }

    node.style[size] = `${wrapperSize}px`;

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  };

  const handleEntered = (node, isAppearing) => {
    node.style[size] = '100%';

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  };

  const handleExit = (node) => {
    const wrapperSize =
      wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'];
    node.style[size] = `${wrapperSize}px`;

    if (onExit) {
      onExit(node);
    }
  };

  const handleExiting = (node) => {
    const wrapperSize =
      wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'];

    const { duration: transitionDuration } = getTransitionProps(
      { style, timeout },
      {
        mode: 'exit',
      },
    );

    if (timeout === 'auto') {
      // TODO: rename getAutoHeightDuration to something more generic (width support)
      // Actually it just calculates animation duration based on size
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration =
        typeof transitionDuration === 'string'
          ? transitionDuration
          : `${transitionDuration}ms`;
    }

    node.style[size] = collapsedSize;

    if (onExiting) {
      onExiting(node);
    }
  };

  const addEndListener = (_, next) => {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTransitionDuration.current || 0);
    }
  };

  return (
    <TransitionComponent
      in={inProp}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExiting={handleExiting}
      addEndListener={addEndListener}
      timeout={timeout === 'auto' ? null : timeout}
      {...other}
    >
      {(state, childProps) => (
        <Component
          className={clsx(
            classes.container,
            {
              [classes.horizontal]: isHorizontal,
              [classes.entered]: state === 'entered',
              [classes.hidden]:
                state === 'exited' && !inProp && collapsedSize === '0px',
            },
            className,
          )}
          test="prueba"
          style={{
            [isHorizontal ? 'minWidth' : 'minHeight']: collapsedSize,
            ...style,
          }}
          ref={ref}
          {...childProps}
        >
          <div className={classes.wrapper} ref={wrapperRef}>
            <div
              className={clsx(classes.wrapperInner, {
                [classes.horizontal]: isHorizontal,
              })}
            >
              {children}
            </div>
          </div>
        </Component>
      )}
    </TransitionComponent>
  );
});

Collapse.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   * @deprecated
   * The height of the container when collapsed.
   *
   * This prop will be deprecated and removed in v5, use collapsedSize instead.
   */
  collapsedHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   */
  collapsedSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * The collapse transition orientation.
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

Collapse.muiSupportAuto = true;

export default withStyles(styles, { name: 'MuiCollapse' })(Collapse);
