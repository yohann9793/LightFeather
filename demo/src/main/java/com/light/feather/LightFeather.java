package com.light.feather;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
@RestController
public class LightFeather {

	public static void main(String[] args) {
		SpringApplication.run(LightFeather.class, args);
	}

	@CrossOrigin
	@GetMapping("/api/supervisors")
	public ResponseEntity<List<String>> getSupervisors() {
		// Fetch supervisors from the external endpoint
		RestTemplate restTemplate = new RestTemplate();
		Supervisor[] supervisors = restTemplate.getForObject(
				"https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers", Supervisor[].class);

		// Convert supervisors array to JSON string, sort, and collect
		List<String> formattedSupervisors = Arrays.stream(supervisors)
				.sorted(new SupervisorComparator())
				.map(Supervisor::format)
				.collect(Collectors.toList());

		// Return the supervisors array in the response
		return ResponseEntity.ok(formattedSupervisors);
	}

	static class Supervisor {
		private String jurisdiction;
		private String lastName;
		private String firstName;

		// Getter and setter methods for jurisdiction, lastName, and firstName
		// format() method

		public String getJurisdiction() {
			return jurisdiction;
		}

		public void setJurisdiction(String jurisdiction) {
			this.jurisdiction = jurisdiction;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String format() {
			// Remove numeric characters from jurisdiction
			String formattedJurisdiction = jurisdiction.replaceAll("\\d", "");
			return "<"+formattedJurisdiction +">" + " - "  + "<" +lastName +">"+ ", " +"<"+ firstName +">";
		}
	}

	static class SupervisorComparator implements Comparator<Supervisor> {
		@Override
		public int compare(Supervisor s1, Supervisor s2) {
			// Compare by jurisdiction
			int jurisdictionComparison = s1.getJurisdiction().compareTo(s2.getJurisdiction());
			if (jurisdictionComparison != 0) {
				return jurisdictionComparison;
			}

			// If jurisdictions are the same, compare by last name
			int lastNameComparison = s1.getLastName().compareTo(s2.getLastName());
			if (lastNameComparison != 0) {
				return lastNameComparison;
			}

			// If last names are the same, compare by first name
			return s1.getFirstName().compareTo(s2.getFirstName());
		}
	}
}
