"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Calendar, Clock, MapPin, ArrowRight, Receipt } from "lucide-react"
import { getTickets, TicketResponse } from "@/lib/api/booking"
import { handleError } from "@/lib/utils/errorHandler"

type BookingHistoryItem = TicketResponse["result"][number]
type HistoryTab = "all" | "issued" | "cancelled"

export default function PaymentHistoryPage() {
  const { isAuthenticated, isChecking } = useAuth({ redirectPath: "/ticket/history" })
  const [bookings, setBookings] = useState<BookingHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<HistoryTab>("all")

  useEffect(() => {
    if (isChecking || !isAuthenticated) return

    const fetchBookings = async () => {
      try {
        setLoading(true)
        const response = await getTickets()
        setBookings(response.result ?? [])
      } catch (err) {
        const errorMessage = handleError(err, "예매 내역 조회 중 오류가 발생했습니다.", false)
        setError(errorMessage)
        setBookings([])
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [isChecking, isAuthenticated])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "yyyy년 MM월 dd일(EEEE)", { locale: ko })
  }

  const parseBookingCodeDate = (bookingCode: string) => {
    const rawDate = bookingCode.slice(0, 14)

    if (!/^\d{14}$/.test(rawDate)) {
      return null
    }

    const year = Number(rawDate.slice(0, 4))
    const month = Number(rawDate.slice(4, 6)) - 1
    const day = Number(rawDate.slice(6, 8))
    const hour = Number(rawDate.slice(8, 10))
    const minute = Number(rawDate.slice(10, 12))
    const second = Number(rawDate.slice(12, 14))

    const parsedDate = new Date(year, month, day, hour, minute, second)

    if (
      parsedDate.getFullYear() !== year ||
      parsedDate.getMonth() !== month ||
      parsedDate.getDate() !== day
    ) {
      return null
    }

    return parsedDate
  }

  const formatPaymentDate = (bookingCode: string) => {
    const parsedDate = parseBookingCodeDate(bookingCode)
    if (!parsedDate) return "확인 불가"
    return format(parsedDate, "yyyy년 MM월 dd일(EEEE)", { locale: ko })
  }

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5)
  }

  const getTrainTypeColor = (trainName: string) => {
    switch (trainName) {
      case "KTX":
      case "KTX-산천":
        return "bg-blue-600 text-white"
      case "ITX-새마을":
        return "bg-green-600 text-white"
      case "무궁화호":
        return "bg-orange-600 text-white"
      case "ITX-청춘":
        return "bg-purple-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getCarTypeName = (carType: string) => {
    switch (carType) {
      case "STANDARD":
        return "일반실"
      case "FIRST_CLASS":
        return "특실"
      default:
        return carType
    }
  }

  const getPassengerTypeName = (passengerType: string) => {
    switch (passengerType) {
      case "ADULT":
        return "어른"
      case "CHILD":
        return "어린이"
      case "SENIOR":
        return "경로"
      case "DISABLED_HEAVY":
        return "중증장애인"
      case "DISABLED_LIGHT":
        return "경증장애인"
      case "VETERAN":
        return "국가유공자"
      case "INFANT":
        return "유아"
      default:
        return passengerType
    }
  }

  const isIssuedBooking = (booking: BookingHistoryItem) =>
    booking.tickets.length > 0 && booking.tickets.every((ticket) => ticket.status === "ISSUED")

  const isCancelledBooking = (booking: BookingHistoryItem) =>
    booking.tickets.some(
      (ticket) => ticket.status === "CANCELLED" || ticket.status === "REFUNDED"
    )

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (activeTab === "issued") {
        return isIssuedBooking(booking)
      }
      if (activeTab === "cancelled") {
        return isCancelledBooking(booking)
      }
      return true
    })
  }, [activeTab, bookings])

  const getTicketStatusName = (status: string) => {
    switch (status) {
      case "ISSUED":
        return "발권완료"
      case "CANCELLED":
        return "취소"
      case "REFUNDED":
        return "환불"
      default:
        return status
    }
  }

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case "ISSUED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      case "REFUNDED":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">인증을 확인하고 있습니다...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
        <div className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">예매 내역을 불러오고 있습니다...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">예매 내역</h2>
            <p className="text-gray-600">예매번호와 영수증 상세를 확인할 수 있습니다</p>
          </div>

          <div className="mb-6">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as HistoryTab)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  전체
                </TabsTrigger>
                <TabsTrigger value="issued" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  발권완료
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  취소/환불
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-6">
            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </CardContent>
              </Card>
            )}

            {filteredBookings.length === 0 ? (
              <Card className="border-gray-200">
                <CardContent className="p-16 text-center">
                  <div className="mx-auto mb-6 w-16 h-16 relative">
                    <Receipt className="w-full h-full text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === "all" && "예매 내역이 없습니다."}
                    {activeTab === "issued" && "발권 완료된 내역이 없습니다."}
                    {activeTab === "cancelled" && "취소/환불 내역이 없습니다."}
                  </h3>
                  <p className="text-gray-500 mb-4">승차권을 예매하시면 내역이 여기에 표시됩니다.</p>
                  <Link href="/ticket/search">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">승차권 예매하기</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.bookingId} className="border-l-4 border-blue-500 shadow-md">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <Badge className={`${getTrainTypeColor(booking.trainName)} px-3 py-1`}>
                            {booking.trainName}
                          </Badge>
                          <Badge variant="outline" className="font-medium">
                            열차번호 {booking.trainNumber}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>운행일자: {formatDate(booking.operationDate)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Receipt className="h-4 w-4" />
                            <span>결제일자: {formatPaymentDate(booking.bookingCode)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <span className="text-gray-500 mr-1">예매번호:</span>
                        <span className="font-mono">{booking.bookingCode}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 text-sm">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{booking.departureStationName}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{booking.arrivalStationName}</span>
                        <Clock className="h-4 w-4 text-gray-400 ml-2" />
                        <span>
                          {formatTime(booking.departureTime)} ~ {formatTime(booking.arrivalTime)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">승차권 목록</h4>
                      {booking.tickets.map((ticket) => (
                        <div
                          key={ticket.ticketId}
                          className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {getCarTypeName(ticket.carType)}
                              </Badge>
                              <Badge className={`${getTicketStatusColor(ticket.status)} text-xs`}>
                                {getTicketStatusName(ticket.status)}
                              </Badge>
                              <span className="font-mono text-xs text-gray-600">
                                승차권번호: {ticket.ticketNumber}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700">
                              {ticket.carNumber}호차 {ticket.seatNumber} / {getPassengerTypeName(ticket.passengerType)}
                            </div>
                          </div>

                          <Link href={`/ticket/history/receipt?ticketId=${ticket.ticketId}`}>
                            <Button size="sm" variant="outline" className="w-full md:w-auto">
                              영수증 상세보기
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {filteredBookings.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">총 {filteredBookings.length}건의 예매 내역</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
