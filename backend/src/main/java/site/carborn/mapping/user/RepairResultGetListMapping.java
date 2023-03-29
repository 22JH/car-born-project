package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface RepairResultGetListMapping {

    int getId();

    int getMileage();

    int getRepairPrice();

    LocalDateTime getRepairDt();

    LocalDateTime getRegDt();
}