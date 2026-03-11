// Chess puzzles extracted from Lichess open puzzle database
// https://database.lichess.org/#puzzles (CC0 license)
// Format: { fen, solution: ['uci-move', ...], rating }
//
// Easy = mate in 1 (player makes 1 move)
// Medium = mate in 2 (player makes 2 moves, with 1 opponent response)
// Hard = mate in 3 (player makes 3 moves, with 2 opponent responses)

export const EASY_PUZZLES = [
  {
    fen: '2kr1b1r/p1p2pp1/2pqN3/7p/6n1/2NPB3/PPP2PPP/R2Q1RK1 b - - 0 13',
    solution: ['d6h2'],
    rating: 731,
  },
  {
    fen: '6k1/p1p3pp/4N3/1p6/2q1r1n1/2B5/PP4PP/3R1R1K w - - 0 29',
    solution: ['f1f8'],
    rating: 603,
  },
  {
    fen: 'r4rk1/pp3ppp/3b4/2p1pPB1/7N/2PP3n/PP4PP/R2Q2RK b - - 0 18',
    solution: ['h3f2'],
    rating: 870,
  },
  {
    fen: 'r3k2r/pb1p1ppp/1b4q1/1Q2P3/8/2NP1PP1/PP4P1/R1B2R1K b kq - 0 17',
    solution: ['g6h5'],
    rating: 1150,
  },
  {
    fen: '1qr2rk1/1p1p1ppp/pB2p1n1/7n/2P1P3/1Q2NP1P/PP2BKPb/3R1R2 b - - 2 20',
    solution: ['b8g3'],
    rating: 1125,
  },
  {
    fen: '7k/p4R1p/3p3B/2pN1n2/2PbB1b1/3P2P1/P3r3/5R1K b - - 0 28',
    solution: ['f5g3'],
    rating: 893,
  },
  {
    fen: '8/6k1/1R5p/5p1P/5P1K/6P1/8/r7 b - - 3 58',
    solution: ['a1h1'],
    rating: 486,
  },
  {
    fen: '2r2rk1/5ppp/bq2p3/p2pP1N1/Pb1p2P1/1P2P2P/2QN4/2R1K2R w K - 0 19',
    solution: ['c2h7'],
    rating: 1015,
  },
  {
    fen: 'r4rk1/1pp2ppp/p2p4/2bPp3/2P1PB1q/P1N2B2/1P3P2/R2QK1R1 b Q - 0 15',
    solution: ['h4f2'],
    rating: 1054,
  },
  {
    fen: '5r1k/pp4pp/2p5/6q1/5R2/2P5/P1P2PPP/3rR1K1 w - - 0 28',
    solution: ['f4f8'],
    rating: 596,
  },
  {
    fen: 'r6k/1b3pp1/p1q1pn1p/2p5/P1B5/1PN4Q/2P1RP1P/R5K1 b - - 0 26',
    solution: ['c6h1'],
    rating: 919,
  },
  {
    fen: 'r2r2k1/2q1bpp1/3p3p/1ppn4/1P1BP3/P5Q1/4RPPP/R5K1 w - - 0 21',
    solution: ['g3g7'],
    rating: 454,
  },
  {
    fen: '5kr1/ppR3p1/3R3p/1n6/1r6/8/1P3PPP/2K5 w - - 5 32',
    solution: ['d6d8'],
    rating: 809,
  },
  {
    fen: 'r1b1kb1Q/ppp4p/6pB/3P4/2pn4/8/PPP1qPPP/RNK4R b q - 3 13',
    solution: ['e2c2'],
    rating: 908,
  },
  {
    fen: '7r/ppp2kp1/2nb1pp1/3p3r/3P2P1/2PQB3/PP3PP1/R3R1K1 b - - 0 18',
    solution: ['h5h1'],
    rating: 645,
  },
  {
    fen: '2kr1br1/ppBb1ppp/8/3P2Q1/6n1/5n2/PP3qPP/RN2R2K w - - 0 17',
    solution: ['g5d8'],
    rating: 1020,
  },
  {
    fen: '3r1n2/1bp1bkpp/p1q2n2/1p6/3P4/P1N3B1/1PP1QPPP/R3R1K1 b - - 6 18',
    solution: ['c6g2'],
    rating: 600,
  },
  {
    fen: 'rn2q1k1/pp3ppp/2pb4/3p1B2/2PN4/1Q6/PP3PPP/R1B4K b - - 0 15',
    solution: ['e8e1'],
    rating: 512,
  },
  {
    fen: '2rq1rk1/1b5p/p3p3/1p1pBpp1/2nP2N1/1RP1PP2/P1Q3PP/3R2K1 w - - 0 23',
    solution: ['g4h6'],
    rating: 1200,
  },
  {
    fen: 'r4rk1/2q2ppp/3pp3/4Pb1N/1p6/1p4Q1/PPP3PP/1K1RR3 w - - 0 22',
    solution: ['g3g7'],
    rating: 926,
  },
  {
    fen: '8/6pp/6k1/5pN1/5P2/5rPb/4R2P/6K1 b - - 1 35',
    solution: ['f3f1'],
    rating: 404,
  },
  {
    fen: '6k1/2p2ppp/pnp5/B7/2P3PP/1P2PPR1/r3b2r/3R2K1 w - - 2 30',
    solution: ['d1d8'],
    rating: 473,
  },
  {
    fen: 'r3k2r/ppp2p1p/2n1pp2/7q/2PN2P1/2BP2b1/PP2B1P1/R2Q1RK1 b kq - 0 16',
    solution: ['h5h2'],
    rating: 843,
  },
  {
    fen: 'Q4rk1/p1p3p1/6P1/8/3P4/7P/q3r3/B4RK1 w - - 2 35',
    solution: ['a8f8'],
    rating: 471,
  },
  {
    fen: 'rn2kb1r/pp2pp1p/2p2np1/4q3/8/2N4Q/PPPPBPPP/R1B1K2R w KQkq - 0 9',
    solution: ['h3c8'],
    rating: 768,
  },
  {
    fen: 'rqnr2k1/5ppp/p7/4p3/8/1P5P/PBP2PP1/R2R2K1 w - - 0 24',
    solution: ['d1d8'],
    rating: 687,
  },
  {
    fen: '2kr2r1/ppb2ppp/3qNn2/3p2B1/P7/2P2Q1P/1PB2PP1/R4RK1 b - - 0 18',
    solution: ['d6h2'],
    rating: 713,
  },
  {
    fen: '2r3k1/7p/6q1/p1Np4/Qp2pr2/P4P2/1PR2P1K/6R1 b - - 1 36',
    solution: ['f4h4'],
    rating: 878,
  },
  {
    fen: 'rn2kb1r/pQ2pppp/2p2n2/8/3q2b1/8/PPP2PPP/RNB1KBNR b KQkq - 0 7',
    solution: ['d4d1'],
    rating: 730,
  },
  {
    fen: '2rq1rk1/1p3p1p/p1pn2p1/P1Np4/1P1PnP2/4P3/5PBP/R1Q3RK b - - 3 22',
    solution: ['e4f2'],
    rating: 816,
  },
];

export const MEDIUM_PUZZLES = [
  {
    fen: '4r3/1k6/pp3P2/1b5p/3R1p2/P1R2P2/1P4PP/6K1 b - - 0 35',
    solution: ['e8e1', 'g1f2', 'e1f1'],
    rating: 1376,
  },
  {
    fen: 'r1bq3r/pp1nbkp1/2p1p2p/8/2BP4/1PN3P1/P3QP1P/3R1RK1 w - - 0 20',
    solution: ['e2e6', 'f7f8', 'e6f7'],
    rating: 1575,
  },
  {
    fen: '6k1/5ppp/r1p5/p1n1rP2/8/2P2N1P/2P3P1/3R2K1 w - - 0 22',
    solution: ['d1d8', 'e5e8', 'd8e8'],
    rating: 1118,
  },
  {
    fen: '5r1k/pp4pp/5p2/1BbQp1r1/7K/7P/1PP3P1/3R3R b - - 3 26',
    solution: ['c5f2', 'g2g3', 'f2g3'],
    rating: 1018,
  },
  {
    fen: 'rn1qrk2/ppp3pQ/3p1pP1/3Pp3/2P1P3/8/PP3PP1/R1B1K3 w Q - 3 17',
    solution: ['h7h8', 'f8e7', 'h8g7'],
    rating: 948,
  },
  {
    fen: 'r1bqr1k1/pp1nbpp1/2p5/3n2P1/2BP4/P7/1PQNNPP1/R3K2R w KQ - 1 14',
    solution: ['c2h7', 'g8f8', 'h7h8'],
    rating: 908,
  },
  {
    fen: '2r5/pR5p/5p1k/4p3/4R3/B4nPP/PP3P2/1K6 b - - 0 27',
    solution: ['f3d2', 'b1a1', 'c8c1'],
    rating: 1516,
  },
  {
    fen: '1r4k1/p4ppp/2Q5/3pq3/8/P6P/2PR1PP1/1R4K1 b - - 0 26',
    solution: ['b8b1', 'd2d1', 'b1d1'],
    rating: 1152,
  },
  {
    fen: '8/3k1p2/4p3/p2p4/3P1P2/q3P1rP/7r/1QR2K2 w - - 2 35',
    solution: ['b1b7', 'd7e8', 'c1c8'],
    rating: 982,
  },
  {
    fen: '4rk2/p4q2/1p3Q1b/8/1p5N/2P1p3/P3P3/2K5 w - - 1 44',
    solution: ['h4g6', 'f8g8', 'f6h8'],
    rating: 1311,
  },
  {
    fen: '3rk2r/2qn2p1/p1Q1p3/3n3p/8/8/PP4PP/5R1K w k - 0 24',
    solution: ['c6e6', 'd5e7', 'e6f7'],
    rating: 1115,
  },
  {
    fen: '6k1/pp3pp1/2p1q1Pp/3b4/8/6Q1/PB3Pp1/3r1NK1 w - - 0 28',
    solution: ['g3b8', 'e6e8', 'b8e8'],
    rating: 801,
  },
  {
    fen: '1r6/5k2/2Q1pNp1/p5Pp/1p2P2P/2P4R/KP3P2/3q4 b - - 0 31',
    solution: ['b4b3', 'a2a3', 'd1a1'],
    rating: 1163,
  },
  {
    fen: 'r4r2/2q1Nb2/5Qpk/2n4p/pp5P/8/1PP2PP1/2KR3R w - - 0 29',
    solution: ['e7f5', 'h6h7', 'f6g7'],
    rating: 1531,
  },
  {
    fen: '4r1k1/p4p1p/1p6/6B1/3P2n1/P4Q2/1P4P1/7K b - - 0 34',
    solution: ['e8e1', 'f3f1', 'e1f1'],
    rating: 992,
  },
  {
    fen: '6k1/2R3pp/2p4q/1p1p4/3P4/P7/1PP2R2/1K1Nr3 w - - 4 33',
    solution: ['c7c8', 'e1e8', 'c8e8'],
    rating: 976,
  },
  {
    fen: '2r3k1/3R1ppp/p1q5/2p2Q2/P7/7P/5PP1/6K1 w - - 4 27',
    solution: ['f5f7', 'g8h8', 'f7g7'],
    rating: 991,
  },
  {
    fen: '3r3k/6p1/4Q3/4B3/1p3P2/4PKP1/3q4/8 w - - 18 52',
    solution: ['e6h6', 'h8g8', 'h6g7'],
    rating: 1453,
  },
  {
    fen: '3r4/4kp1r/p2Np1p1/3bP3/P2n4/8/1P3RPP/5RK1 w - - 5 26',
    solution: ['f2f7', 'h7f7', 'f1f7'],
    rating: 1163,
  },
  {
    fen: '4r2k/3q3r/1p4pQ/p1pP4/2P4P/1N4p1/PP3RK1/8 w - - 2 38',
    solution: ['f2f8', 'e8f8', 'h6f8'],
    rating: 1048,
  },
  {
    fen: '8/1p4p1/pb2pp1p/3n1k2/3P4/P3BN1P/1P2KPP1/8 w - - 1 27',
    solution: ['f3h4', 'f5e4', 'f2f3'],
    rating: 1149,
  },
  {
    fen: '1R6/6pk/2p4p/3bP2r/5B1P/2P1RqP1/P4P1Q/6K1 b - - 3 40',
    solution: ['f3d1', 'e3e1', 'd1e1'],
    rating: 917,
  },
  {
    fen: '5Q2/pbp3np/1p1pq1pk/1P6/P6P/6K1/8/8 w - - 0 33',
    solution: ['f8f4', 'g6g5', 'f4g5'],
    rating: 1144,
  },
  {
    fen: '3br1kr/7p/4p1pQ/P5P1/1B5P/P6q/5R2/6K1 w - - 2 36',
    solution: ['f2f8', 'e8f8', 'h6f8'],
    rating: 1074,
  },
  {
    fen: '1R2R3/p7/1p1k3p/1Pb5/P5p1/6P1/5r1P/7K b - - 7 41',
    solution: ['f2f1', 'h1g2', 'f1g1'],
    rating: 1253,
  },
  {
    fen: '3r2k1/1q3ppp/p3p3/Qp1r4/7P/P4P2/1PP3P1/1K1R3R w - - 0 22',
    solution: ['a5d8', 'd5d8', 'd1d8'],
    rating: 1373,
  },
  {
    fen: '8/5p2/1R6/6pk/8/3r2PP/5K2/8 w - - 4 41',
    solution: ['g3g4', 'h5h4', 'b6h6'],
    rating: 849,
  },
  {
    fen: 'Q7/5qk1/p2p4/b1p1pr2/P7/6P1/4KP1R/8 w - - 4 39',
    solution: ['a8h8', 'g7g6', 'h8h6'],
    rating: 1024,
  },
  {
    fen: '1r5r/5pk1/4p3/3p2PP/N1nP4/n1P5/P3B3/K1R4R b - - 0 34',
    solution: ['b8b1', 'c1b1', 'a3c2'],
    rating: 1495,
  },
  {
    fen: '6k1/4qpp1/3p3p/8/2BP4/1PQ5/3n1PPP/6K1 b - - 0 29',
    solution: ['e7e1', 'c4f1', 'e1f1'],
    rating: 978,
  },
];

export const HARD_PUZZLES = [
  {
    fen: '6nr/p4p1p/k1p5/1p6/1QN5/2P1P3/4KPqP/8 w - - 0 27',
    solution: ['b4a5', 'a6b7', 'c4d6', 'b7b8', 'a5d8'],
    rating: 1179,
  },
  {
    fen: '1r6/pp2kppQ/2n1p1n1/3p2P1/5P2/2PqP3/PP1N4/2KR3R b - - 4 27',
    solution: ['c6b4', 'c3b4', 'b8c8', 'd2c4', 'c8c4'],
    rating: 1987,
  },
  {
    fen: 'rn3rk1/4pp1p/3p2pB/2q4P/3QP1b1/Pp6/1P2B3/1K1R2NR b - - 0 20',
    solution: ['c5c2', 'b1a1', 'a8a3', 'b2a3', 'c2a2'],
    rating: 1936,
  },
  {
    fen: '2k1r3/pppn1pp1/3b2b1/3B2Pp/5P2/3P3P/PPPR4/2K3NR b - - 0 18',
    solution: ['e8e1', 'd2d1', 'd6f4', 'c1b1', 'e1d1'],
    rating: 1470,
  },
  {
    fen: 'r6r/pp2kb2/3p1p2/1N1Pp3/3bP3/P2B2P1/1P1Q2PP/7K b - - 7 28',
    solution: ['h8h2', 'h1h2', 'a8h8', 'd2h6', 'h8h6'],
    rating: 1382,
  },
  {
    fen: '8/2p4r/1p3k2/p2PR1p1/P1P2pP1/1P3P1r/4R1K1/8 b - - 0 46',
    solution: ['h3h2', 'g2f1', 'h2h1', 'f1f2', 'h7h2'],
    rating: 1580,
  },
  {
    fen: 'r1qr3k/pp3pb1/1np1p3/8/3P3P/2N2PR1/PP1Q2P1/2KR4 w - - 0 23',
    solution: ['d2g5', 'd8g8', 'g5h5', 'g7h6', 'h5h6'],
    rating: 1778,
  },
  {
    fen: 'r5k1/pp2q1p1/2p1p2p/3nP1pP/3P2P1/2PQ1r2/PPB5/R5K1 w - - 0 24',
    solution: ['d3h7', 'g8f7', 'c2g6', 'f7f8', 'h7h8'],
    rating: 1376,
  },
  {
    fen: '8/8/6p1/PR3p2/1P3k1P/8/r5P1/7K b - - 0 39',
    solution: ['f4g3', 'b5d5', 'a2a1', 'd5d1', 'a1d1'],
    rating: 1453,
  },
  {
    fen: 'r1b2rk1/1p2b1p1/pq2p1P1/3pn3/1P1P4/P1N1P3/6P1/R2QK2R w KQ - 0 18',
    solution: ['h1h8', 'g8h8', 'd1h5', 'h8g8', 'h5h7'],
    rating: 1794,
  },
  {
    fen: 'r1b2rk1/p4ppp/2p5/6q1/6P1/3p1Q1P/PPP5/1K2RR2 w - - 0 18',
    solution: ['f3f7', 'f8f7', 'e1e8', 'f7f8', 'f1f8'],
    rating: 1440,
  },
  {
    fen: '8/3r1ppp/4p3/k3P3/pR2R2P/2P5/3r1PP1/2K5 b - - 5 31',
    solution: ['d2d1', 'c1b2', 'd7d2', 'b2a3', 'd1a1'],
    rating: 1018,
  },
  {
    fen: '5k2/5r1p/pp2Q3/8/8/1P6/P1q2PPP/4R1K1 b - - 0 32',
    solution: ['c2f2', 'g1h1', 'f2f1', 'e1f1', 'f7f1'],
    rating: 1129,
  },
  {
    fen: '2b2r1k/pp4p1/2p5/4r3/2B5/1P6/P4pK1/5R2 w - - 5 33',
    solution: ['f1h1', 'c8h3', 'h1h3', 'e5h5', 'h3h5'],
    rating: 1090,
  },
  {
    fen: '3r2k1/6pp/8/5Q2/2pP4/2q3P1/5RKP/8 w - - 0 36',
    solution: ['f5f7', 'g8h8', 'f7f8', 'd8f8', 'f2f8'],
    rating: 1338,
  },
  {
    fen: '2kr3r/2p2p2/p4q2/1p6/P2PQ3/1PP3pP/6P1/3RR1K1 b - - 0 28',
    solution: ['f6f2', 'g1h1', 'h8h3', 'g2h3', 'f2h2'],
    rating: 1172,
  },
  {
    fen: '5rk1/R5p1/5q1p/8/3p2Q1/1P6/P3rPPP/5RK1 b - - 3 38',
    solution: ['f6f2', 'f1f2', 'e2e1', 'f2f1', 'e1f1'],
    rating: 1370,
  },
  {
    fen: '6Q1/q1k5/3pB1p1/2pP1p2/2P2P2/rp2PK1P/8/8 w - - 3 38',
    solution: ['g8c8', 'c7b6', 'c8c6', 'b6a5', 'c6b5'],
    rating: 1226,
  },
  {
    fen: '8/1b4p1/p3p1Pr/1p1p4/3N4/2PBk3/PP5r/1K3R2 w - - 21 42',
    solution: ['f1f3', 'e3d2', 'd4b3', 'd2e1', 'f3f1'],
    rating: 1500,
  },
  {
    fen: '5k2/5p1p/6p1/1p2q3/2p1p1Q1/1P2P3/P1R2PPP/6K1 b - - 0 26',
    solution: ['e5a1', 'c2c1', 'a1c1', 'g4d1', 'c1d1'],
    rating: 1009,
  },
  {
    fen: '2kr3r/pp2nppp/4p3/1BPpP3/bn1N2Q1/q1N5/2PB1PPP/1K1R3R b - - 5 14',
    solution: ['a4c2', 'd4c2', 'a3b3', 'b1a1', 'b4c2'],
    rating: 1930,
  },
  {
    fen: '5rk1/pR1Q1ppp/4N3/3p1n2/8/7P/q4rP1/4R1K1 w - - 0 29',
    solution: ['d7f7', 'f8f7', 'b7b8', 'f7f8', 'b8f8'],
    rating: 1584,
  },
  {
    fen: '1k1rR3/p1p3pp/Pp3r2/3p4/Q2N4/8/1PPq1PPP/4R1K1 b - - 4 25',
    solution: ['d2f2', 'g1h1', 'f2f1', 'e1f1', 'f6f1'],
    rating: 1297,
  },
  {
    fen: '2k4r/ppp1q1p1/3b2p1/3Q4/1P2NPn1/P1P5/6P1/R1B2RKN b - - 0 21',
    solution: ['h8h1', 'g1h1', 'e7h4', 'h1g1', 'h4h2'],
    rating: 1528,
  },
  {
    fen: 'r5k1/pppb2p1/1bnp1q2/6N1/8/2NQ2B1/PP4PP/7K w - - 0 20',
    solution: ['d3h7', 'g8f8', 'h7h8', 'f8e7', 'c3d5'],
    rating: 1711,
  },
  {
    fen: '4r1k1/4qp2/3p3p/3P1np1/8/2Q5/1P3PPP/R2N1K2 b - - 3 30',
    solution: ['e7e2', 'f1g1', 'e2e1', 'c3e1', 'e8e1'],
    rating: 1248,
  },
  {
    fen: '8/6QR/pr5p/6p1/5p1k/q6P/2P2PPK/8 b - - 7 39',
    solution: ['a3g3', 'f2g3', 'f4g3', 'h2g1', 'b6b1'],
    rating: 1689,
  },
  {
    fen: '1r4k1/2q3p1/p3R2p/b2p4/2pP3N/6P1/1rQ1RPP1/6K1 w - - 0 32',
    solution: ['e6e8', 'b8e8', 'e2e8', 'g8f7', 'c2g6'],
    rating: 1278,
  },
  {
    fen: '2k5/ppp4q/4p1r1/4P3/3P4/1PP2RPp/P3Q1nP/5K2 w - - 3 31',
    solution: ['f3f8', 'c8d7', 'e2b5', 'c7c6', 'b5b7'],
    rating: 1055,
  },
  {
    fen: '3r2k1/2B1P1pp/1Q3p2/2b5/P3n3/5N2/2q2PPP/5RK1 b - - 0 32',
    solution: ['c2f2', 'f1f2', 'd8d1', 'f3e1', 'd1e1'],
    rating: 1783,
  },
];

export const CHESS_PUZZLES = {
  easy: EASY_PUZZLES,
  medium: MEDIUM_PUZZLES,
  hard: HARD_PUZZLES,
};
