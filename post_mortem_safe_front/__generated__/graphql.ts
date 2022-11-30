/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  userCreate: UserCreateOutput;
  userDelete: UserDeleteOutput;
  userUpdate: UserUpdateOutput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  userId: Scalars['ID'];
};


export type MutationUserUpdateArgs = {
  input: UserUpdateInput;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getUser: Users;
  getUsers: Array<Users>;
};


export type QueryGetUserArgs = {
  userId: Scalars['ID'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  mdp: Scalars['String'];
  nom: Scalars['String'];
  prenom: Scalars['String'];
};

export type UserCreateOutput = {
  __typename?: 'UserCreateOutput';
  user: Users;
};

export type UserUpdateInput = {
  email: Scalars['String'];
  mdp: Scalars['String'];
  nom: Scalars['String'];
  prenom: Scalars['String'];
};

export type UserUpdateOutput = {
  __typename?: 'UserUpdateOutput';
  user: Users;
};

export type Users = {
  __typename?: 'Users';
  email: Scalars['String'];
  id: Scalars['String'];
  mdp: Scalars['String'];
  nom: Scalars['String'];
  prenom: Scalars['String'];
};

export type UserDeleteOutput = {
  __typename?: 'userDeleteOutput';
  code: Scalars['Float'];
};
