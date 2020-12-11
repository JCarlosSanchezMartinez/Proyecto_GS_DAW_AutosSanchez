package net.autossanchez.filter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.autossanchez.entity.Municipality;
import net.autossanchez.entity.Provinces;
import net.autossanchez.entity.User;
import net.autossanchez.entity.Vehicle;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilterUser {
	private User user;
	private Vehicle vehicle;
	private Municipality municipality;
	private Provinces province;
	private boolean codeStatus;
}
