import ListingCard from './ListingCard.jsx';

// Presentational: renders whatever list it receives; filtering happens upstream.
function ListingGrid({ listings }) {
  return (
    <ul className="listing-grid" aria-label="Propiedades encontradas">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </ul>
  );
}

export default ListingGrid;
