package webTraderBackEnd.portfolioStocks.repository;

import org.springframework.stereotype.Repository;

import webTraderBackEnd.portfolioStocks.domain.Portfolio;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface PortfolioRepository extends CrudRepository<Portfolio,Long>{
	
}
