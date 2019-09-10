import { ApolloClient } from 'apollo-boost';
// import { gql } from 'apollo-boost';
// import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DocumentNode } from 'graphql';

import { createUploadLink } from 'apollo-upload-client';

// const params=?organizationId=c218136a-29df-4183-8dbc-d1a628d3ba29&sessionKey=b9ca577ad3e71b51f0d6c012ae8cb86a1201bc0b4cc780cfc8a64e8500cfc037&baseUrl=https://devnext.idonate.com/api

export default class GraphQLApi {
  private client;

  constructor(baseUrl: string, sessionKey?: string) {
    const conn = !sessionKey ? baseUrl : baseUrl + '/graphql?session_key=' + sessionKey;
    this.client = new ApolloClient({
      link: createUploadLink({ uri: conn }),
      cache: new InMemoryCache(),
    });
  }

  public query(q: DocumentNode, params?: any): any {
    return this.client.query({ query: q, variables: params, errorPolicy: 'all', fetchPolicy: 'no-cache' });
  }

  public mutate(m: DocumentNode, params?: any): any {
    return this.client.mutate({ mutation: m, variables: params, errorPolicy: 'all', fetchPolicy: 'no-cache' });
  }
}

