import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { SxProps } from '@material-ui/system';
// eslint-disable-next-line no-restricted-imports -- importing types
import { InternalStandardProps as StandardProps } from '@material-ui/core';
import { capitalize } from '@material-ui/core/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
  Theme,
} from '@material-ui/core/styles';
import TimelineContext from './TimelineContext';
import { getTimelineUtilityClass } from './timelineClasses';

export type TimelineClassKey = keyof NonNullable<TimelineProps['classes']>;

export interface TimelineProps extends StandardProps<React.HTMLAttributes<HTMLUListElement>> {
  /**
   * The position where the timeline's content should appear.
   * @default 'left'
   */
  align?: 'left' | 'right' | 'alternate';
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `align="left"`. */
    alignLeft?: string;
    /** Styles applied to the root element if `align="right"`. */
    alignRight?: string;
    /** Styles applied to the root element if `align="alternate"`. */
    alignAlternate?: string;
  };

  /**
   * className applied to the root element.
   */
  className?: string;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

type StyleProps = TimelineProps;

const useUtilityClasses = (styleProps: StyleProps) => {
  const { align, classes } = styleProps;

  const slots = {
    root: ['root', align && `align${capitalize(align)}`],
  };

  return composeClasses(slots, getTimelineUtilityClass, classes);
};

const TimelineRoot = experimentalStyled(
  'ul' as const,
  {},
  {
    name: 'MuiTimeline' as const,
    slot: 'Root',
    overridesResolver: (props, styles) => {
      const { styleProps } = props;
      return {
        ...styles.root,
        ...(styleProps.align && styles[`align${capitalize(styleProps.align)}` as TimelineClassKey]),
      };
    },
  },
)({
  display: 'flex',
  flexDirection: 'column',
  padding: '6px 16px',
  flexGrow: 1,
});

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [Timeline API](https://material-ui.com/api/timeline/)
 */
const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(function Timeline(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTimeline' });
  const { align = 'left', className, ...other } = props;
  const styleProps = { ...props, align };
  const classes = useUtilityClasses(styleProps);
  return (
    <TimelineContext.Provider value={{ align }}>
      <TimelineRoot
        className={clsx(classes.root, className)}
        styleProps={styleProps}
        // @ts-expect-error TypeScript bug, need to keep unknown for DX
        ref={ref}
        {...other}
      />
    </TimelineContext.Provider>
  );
});

Timeline.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The position where the timeline's content should appear.
   * @default 'left'
   */
  align: PropTypes.oneOf(['alternate', 'left', 'right']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
} as any;

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [Timeline API](https://material-ui.com/api/timeline/)
 */
export default Timeline;
