'use client'
import { keyframes } from '@emotion/react'
import { useTheme } from '@mui/material'
import Reveal, { RevealProps } from 'react-awesome-reveal'
import React from 'react'

export const upAnimation = keyframes`
from {
  opacity: 0;
  transform: translate(0, 150px);
}

to {
  opacity: 1;
  transform: translate(0, 0);
}
`
export const leftAnimation = keyframes`
from {
opacity: 0;
transform: translate(150px, 0px);
}

to {
opacity: 1;
transform: translate(0, 0);
}
`
export const rightAnimation = keyframes`
from {
opacity: 0;
transform: translate(-150px, 0px);
}

to {
opacity: 1;
transform: translate(0, 0);
}
`

export const fadeAnimation = keyframes`
from {
opacity: 0;
}

to {
opacity: 1;
}
`

export const downAnimation = keyframes`
from {
opacity: 0;
transform: translate(0, -150px);
}

to {
opacity: 1;
transform: translate(0, 0);
}
`
/**
 * @deprecated use {@link AnimationWrapper} instead
 **/
export const FadeAnimate = ({
  children,
  duration,
  delay,
  cascade,
}: {
  children?: React.ReactNode
  duration?: number
  delay?: number
  cascade?: boolean
}) => {
  const theme = useTheme()
  const width = window ? window.innerWidth : 0
  return (
    <>
      {theme.breakpoints.values.sm <= width ? (
        <Reveal
          keyframes={fadeAnimation}
          delay={delay ? delay : 0}
          triggerOnce
          cascade={cascade}
          duration={duration ? duration : 1000}
        >
          {children}
        </Reveal>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
/**
 * @deprecated use {@link AnimationWrapper} instead
 **/
export const RightAnimate = ({
  children,
  duration,
  delay,
  cascade,
}: {
  children?: React.ReactNode
  duration?: number
  delay?: number
  cascade?: boolean
}) => {
  const theme = useTheme()
  const width = window ? window.innerWidth : 0
  return (
    <>
      {theme.breakpoints.values.sm <= width ? (
        <Reveal
          keyframes={rightAnimation}
          delay={delay ? delay : 0}
          triggerOnce
          cascade={cascade}
          duration={duration ? duration : 1000}
        >
          {children}
        </Reveal>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
/**
 * @deprecated use {@link AnimationWrapper} instead
 **/
export const LeftAnimate = ({
  children,
  duration,
  delay,
  cascade,
}: {
  children?: React.ReactNode
  duration?: number
  delay?: number
  cascade?: boolean
}) => {
  const theme = useTheme()
  const width = window ? window.innerWidth : 0
  return (
    <>
      {theme.breakpoints.values.sm <= width ? (
        <Reveal
          keyframes={leftAnimation}
          delay={delay ? delay : 0}
          triggerOnce
          cascade={cascade}
          duration={duration ? duration : 1000}
        >
          {children}
        </Reveal>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
/**
 * @deprecated use {@link AnimationWrapper} instead
 **/
export const UpAnimate = ({
  children,
  duration,
  delay,
  cascade,
}: {
  children?: React.ReactNode
  duration?: number
  delay?: number
  cascade?: boolean
}) => {
  const theme = useTheme()
  const width = window ? window.innerWidth : 0
  return (
    <>
      {theme.breakpoints.values.sm <= width ? (
        <Reveal
          keyframes={upAnimation}
          delay={delay ? delay : 0}
          triggerOnce
          cascade={cascade}
          duration={duration ? duration : 1000}
        >
          {children}
        </Reveal>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

/**
 * @deprecated use {@link AnimationWrapper} instead
 **/
export const DownAnimate = ({
  children,
  duration,
  delay,
  cascade,
}: {
  children?: React.ReactNode
  duration?: number
  delay?: number
  cascade?: boolean
}) => {
  const theme = useTheme()
  const width = window ? window.innerWidth : 0
  return (
    <>
      {theme.breakpoints.values.sm <= width ? (
        <Reveal
          keyframes={downAnimation}
          delay={delay ? delay : 0}
          triggerOnce
          cascade={cascade}
          duration={duration ? duration : 1000}
        >
          {children}
        </Reveal>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

/**
 * @name AnimationWrapper
 *
 * @description
 * A wrapper component that animates its children with a keyframe animation
 *
 * @param children - the children to animate
 * @param orientation - the direction of the animation. {@Default right}
 * @param duration - the duration of the animation. {@Default 1000}
 * @param delay - the delay of the animation. {@Default 0}
 *
 * @returns a ReactNode with the children animated
 *
 **/
export const AnimationWrapper = ({
  children,
  duration = 800,
  delay = 0,
  cascade,
  orientation = 'right',
  style,
}: RevealProps & {
  orientation?: 'left' | 'right' | 'up' | 'down'
}) => {
  const theme = useTheme()
  const width = window ? window.innerWidth : 0
  return (
    <>
      {theme.breakpoints.values.sm <= width ? (
        <Reveal
          keyframes={
            orientation == 'right'
              ? rightAnimation
              : orientation == 'left'
              ? leftAnimation
              : orientation == 'up'
              ? upAnimation
              : downAnimation
          }
          delay={delay}
          triggerOnce
          cascade={cascade}
          duration={duration}
          style={{
            width: '100%',
            height: '100%',
            ...style,
          }}
        >
          {children}
        </Reveal>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
