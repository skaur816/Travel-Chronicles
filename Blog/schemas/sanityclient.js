const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'p15fit4e',
  dataset: 'production',
  apiVersion: '2022-07-19', // use current UTC date - see "specifying API version"!
  token: '', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data


})

module.exports = client