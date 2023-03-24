package webTraderBackEnd.portfolioStocks.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import webTraderBackEnd.portfolioStocks.domain.StockDeal;

@Repository
public interface StockDealRepository extends CrudRepository<StockDeal, Long>{
	Optional<StockDeal> findById(Long id);
	void deleteById(Long id);
}
