-- Members
INSERT INTO members (client_code, member_name) VALUES ('12345', 'John Doe');
INSERT INTO members (client_code, member_name) VALUES ('67890', 'Jane Smith');
INSERT INTO members (client_code, member_name) VALUES ('11111', 'Robert Brown');
INSERT INTO members (client_code, member_name) VALUES ('22222', 'Emily Carter');
INSERT INTO members (client_code, member_name) VALUES ('33333', 'Michael Chen');

-- Cards for John Doe
INSERT INTO cards (member_id, card_number, card_type, status)
    SELECT id, '3744 XXXXXX 9008', 'Centurion', 'Active'   FROM members WHERE client_code = '12345';
INSERT INTO cards (member_id, card_number, card_type, status)
    SELECT id, '3782 XXXXXX 0005', 'Platinum',  'Active'   FROM members WHERE client_code = '12345';
INSERT INTO cards (member_id, card_number, card_type, status)
    SELECT id, '3711 XXXXXX 1234', 'Gold',      'Inactive' FROM members WHERE client_code = '12345';

-- Cards for Jane Smith
INSERT INTO cards (member_id, card_number, card_type, status)
    SELECT id, '3701 XXXXXX 4321', 'Platinum', 'Active'    FROM members WHERE client_code = '67890';

-- Cards for Robert Brown
INSERT INTO cards (member_id, card_number, card_type, status)
    SELECT id, '3799 XXXXXX 8888', 'Gold', 'Active'        FROM members WHERE client_code = '11111';

-- Cards for Emily Carter
INSERT INTO cards (member_id, card_number, card_type, status)
    SELECT id, '3755 XXXXXX 2200', 'Centurion', 'Active'   FROM members WHERE client_code = '22222';
INSERT INTO cards (member_id, card_number, card_type, status)
    SELECT id, '3766 XXXXXX 3311', 'Platinum',  'Active'   FROM members WHERE client_code = '22222';

-- Cards for Michael Chen
INSERT INTO cards (member_id, card_number, card_type, status)
    SELECT id, '3788 XXXXXX 5500', 'Gold', 'Active'        FROM members WHERE client_code = '33333';

-- Devices — John Doe card 1
INSERT INTO wearable_devices (card_id, device_type, status, issue_date, serial_no, nfc_enabled)
    SELECT id, 'Bracelet', 'Issued',   '2025-01-12', 'SN-A1B2C3', TRUE  FROM cards WHERE card_number = '3744 XXXXXX 9008';
INSERT INTO wearable_devices (card_id, device_type, status, issue_date, serial_no, nfc_enabled)
    SELECT id, 'Ring',     'Inactive', '2024-03-05', 'SN-D4E5F6', FALSE FROM cards WHERE card_number = '3744 XXXXXX 9008';

-- Devices — John Doe card 2
INSERT INTO wearable_devices (card_id, device_type, status, issue_date, serial_no, nfc_enabled)
    SELECT id, 'Band', 'Issued', '2024-11-01', 'SN-G7H8I9', TRUE        FROM cards WHERE card_number = '3782 XXXXXX 0005';

-- Devices — Jane Smith
INSERT INTO wearable_devices (card_id, device_type, status, issue_date, serial_no, nfc_enabled)
    SELECT id, 'Ring', 'Issued', '2025-02-20', 'SN-J1K2L3', TRUE        FROM cards WHERE card_number = '3701 XXXXXX 4321';

-- Devices — Emily Carter
INSERT INTO wearable_devices (card_id, device_type, status, issue_date, serial_no, nfc_enabled)
    SELECT id, 'Bracelet', 'Issued',    '2025-03-15', 'SN-M4N5O6', TRUE  FROM cards WHERE card_number = '3755 XXXXXX 2200';
INSERT INTO wearable_devices (card_id, device_type, status, issue_date, serial_no, nfc_enabled)
    SELECT id, 'Band',     'Suspended', '2024-09-10', 'SN-P7Q8R9', FALSE FROM cards WHERE card_number = '3755 XXXXXX 2200';

-- Devices — Michael Chen
INSERT INTO wearable_devices (card_id, device_type, status, issue_date, serial_no, nfc_enabled)
    SELECT id, 'Band', 'Issued', '2025-04-01', 'SN-S1T2U3', TRUE        FROM cards WHERE card_number = '3788 XXXXXX 5500';