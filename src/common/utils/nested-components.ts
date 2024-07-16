import { NextPage } from 'next';
import { Component, FC, ReactElement } from 'react';

export type LayoutRenderer = (page: ReactElement | JSX.Element) => ReactElement | JSX.Element;
export type LayoutProvider = { getLayout: LayoutRenderer };
export type OptionalLayoutProvider = Partial<LayoutProvider>;

export type NestedFunctionalComponent<T = {}> = FC<T> & LayoutProvider;
export type NestedFC<T = {}> = NestedFunctionalComponent<T>;
export type NFC<T = {}> = NestedFunctionalComponent<T>;

export type NestedNextPage<P = {}, IP = P> = NextPage<P, IP> & LayoutProvider;
